# Reflection

## Trade-offs

The biggest architectural decision was using Supabase rather than a self-hosted Postgres instance in Docker. This keeps the stack simple to run locally — reviewers only need to `docker compose up` and the app is live without managing a database container, but it introduces an external dependency that requires a quick setup step (creating a free Supabase project and running the schema SQL). With more time I would include a Postgres container in Docker Compose and handle migrations automatically on startup, making the setup truly zero-configuration.

I chose a token-in-URL approach for check-in access rather than full authentication. If I had more time I would've added more Providers based authentication. 
I also would've used a lottie animations to make the app more beautiful and engaginf and also available offline. I would also cover more use cases.

I would've also added some AI feature like "live councelling", using RAG.

## Limitations

I think one of the limitations of this application is that at the end when you look at your joirnal, you cannot "edit" you entry for that certain day. I could not implement it due to time constrains. I also had another more colourful version of the same app, which is more playful and even that I could not submit.

## AI usage

I used Claude (Anthropic) extensively throughout this build for:

- **Previewing** — generating the initial project Previews to see and check my colour palatte choices and then finalised one
- **Deciding between Supabase and Appwrite** — Use Claude's advice in which database to choose 
- **Component structure** — drafting the multi-step check-in flow components and the Supabase integration.
- **Docker configuration** — setting up the Dockerfile with Next.js standalone output and the Mailpit service in Docker Compose.


The journal aesthetic was something I arrived at myself — warm parchment, Caveat handwriting font for inputs so it feels like actually writing, ruled lines in the textarea, Roman numeral chapter headings. I described the direction and iterated the output until it matched the feeling I was going for.
The product decisions were also mine: I chose token-in-URL magic links instead of traditional authentication because a login screen would undermine the daily habit. I added the notebook view because I wanted users to feel a sense of accumulation — that each entry is building something over time.
What I had to fix or redirect: The initial Lottie animation approach added complexity without adding much warmth, so I scrapped it in favour of CSS animations that feel more native. The AI's first email template used flexbox which breaks in most email clients — I caught that and had it rewritten with table-based layout.