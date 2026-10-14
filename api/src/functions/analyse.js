// POST /api/analyse — sends your latest gym data to Claude and returns a written analysis.
// Azure Static Web Apps managed function (Node, Azure Functions v4 programming model).
//
// Setup: add an app setting ANTHROPIC_API_KEY (Static Web App → Settings → Environment variables).
// Request body: { sessions: [...oldest→newest], wellness?: [...oldest→newest], question?: "..." }

const { app } = require('@azure/functions');
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from the environment

const MODEL = 'claude-sonnet-5-5';
const PROGRAMME = 'Four-day gym split plus swimming.'; // edit to match your current training

const SYSTEM = `You are a strength and conditioning coach reviewing one athlete's training log.
Programme: ${PROGRAMME}
Be specific and brief. Cover: what is progressing, what has stalled, volume balance across
muscle groups, and how recovery data (sleep, HRV, resting HR) lines up with performance.
Finish with three concrete changes for next week. Use only the data provided and say when
something you would need is missing.`;

// Defence in depth: the route rule in staticwebapp.config.json is the real gate,
// but refuse anything that didn't come through it with the owner role.
function isOwner(request) {
  const header = request.headers.get('x-ms-client-principal');
  if (!header) return false;
  try {
    const principal = JSON.parse(Buffer.from(header, 'base64').toString('utf8'));
    return Array.isArray(principal.userRoles) && principal.userRoles.includes('owner');
  } catch {
    return false;
  }
}

app.http('analyse', {
  methods: ['POST'],
  authLevel: 'anonymous', // access is enforced by Static Web Apps roles, not function keys
  handler: async (request, context) => {
    if (!isOwner(request)) {
      return { status: 403, jsonBody: { error: 'Not allowed' } };
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return { status: 400, jsonBody: { error: 'Send a JSON body' } };
    }

    const { sessions = [], wellness = [], question } = body ?? {};
    if (!Array.isArray(sessions) || sessions.length === 0) {
      return { status: 400, jsonBody: { error: 'No sessions to analyse' } };
    }

    // Recent data only: keeps cost and response time down, and is what the analysis needs.
    const data = JSON.stringify({
      sessions: sessions.slice(-60),
      wellness: Array.isArray(wellness) ? wellness.slice(-42) : [],
    });

    try {
      const msg = await client.messages.create({
        model: MODEL,
        max_tokens: 1200, // short answers return quickly and cost little
        system: SYSTEM,
        messages: [
          {
            role: 'user',
            content: `${question || 'Analyse my latest training.'}\n\n<data>\n${data}\n</data>`,
          },
        ],
      });

      const analysis = msg.content
        .filter((block) => block.type === 'text')
        .map((block) => block.text)
        .join('\n');

      return {
        jsonBody: {
          analysis,
          model: msg.model,
          usage: msg.usage, // input/output tokens, handy for keeping an eye on cost
          createdAt: new Date().toISOString(),
        },
      };
    } catch (err) {
      context.error('Claude request failed', err);
      return { status: 502, jsonBody: { error: 'Analysis failed, try again' } };
    }
  },
});
