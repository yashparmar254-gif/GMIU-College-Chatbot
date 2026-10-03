# GMIU College Chatbot Website Plan

## Product

A share-ready, responsive single-page website for the GMIU College Chatbot. It turns the existing educational README into a clear public experience while preserving the rule-based promise: all answers are predefined and selected through explicit JavaScript `if / else if / else` conditions, with no AI API, LLM, machine learning, or database.

## Design direction

- **Design movement:** Editorial campus utility — a confident, human educational interface with the clarity of a modern admissions microsite and the immediacy of a conversational tool.
- **Core principles:** calm hierarchy, useful content first, approachable interaction, and visible trust signals.
- **Color philosophy:** deep ink navy signals institutional confidence; warm yellow creates an ownable GMIU accent and points toward action; cool lavender-purple makes the chatbot feel helpful rather than bureaucratic; soft fog backgrounds keep long chat sessions easy on the eyes.
- **Layout paradigm:** a split editorial hero that moves from orientation to action, followed by an offset row of capability cards and a persistent chat workspace. Desktop uses an asymmetric 5/7 column balance; mobile collapses into a clear reading-to-chat flow.
- **Signature elements:** yellow monogram tile, purple conversation bubbles, and small “rule-based / no AI” trust labels.
- **Interaction philosophy:** the interface should feel like an attentive campus guide: quick suggestions for first steps, explicit loading feedback, and gentle fallback wording when a rule does not match.
- **Animation:** restrained rise-in for content, soft pulse for online status, and three-dot typing indicator; motion never delays core actions or hides content.
- **Typography system:** Space Grotesk for display/labels and DM Sans for readable body copy; large, tight headlines pair with concise utility copy.
- **Brand essence:** A practical first stop for students exploring GMIU — clear, welcoming, dependable. Personality: grounded, curious, encouraging.
- **Brand voice:** direct and warm, never salesy. Example lines: “Find your next question.” and “Ask about admissions, programs, or campus life.”
- **Wordmark & logo:** a compact G+ monogram tile paired with the GMIU wordmark; the plus sign represents a next step and the university’s innovation focus.
- **Signature brand color:** GMIU Yellow `#F5C94B`.

## Structure

- `server.js`: static server, `/api/chat`, `/health`, and deterministic rule engine.
- `public/index.html`: semantic page structure, hero, chat panel, capabilities, trust note, and footer.
- `public/styles.css`: responsive visual system, accessibility states, and motion.
- `public/app.js`: chat client, typing state, quick prompts, clear action, and local interaction.
- `public/manus-routes.json`: declared page routes for the Webdev project.
- `public/gmiu-mark.svg`: brand mark used by the UI and metadata.
- `app.config.ts`: literal project logo URL for checkpoint metadata.
- `TODO.md`: concrete product outcomes from the approved Blueprint.
