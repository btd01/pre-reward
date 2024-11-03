

# BetterThanDollar

BetterThanDollar is a pre-reward web application that incentivizes users to engage with its social media presence. Users become eligible for rewards after following the specified actions on Twitter.

## Features

- Users earn rewards by following BetterThanDollar on Twitter and posting about it.
- Built with Next.js and integrated with Supabase.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/msadiqraza/betterThanDollar.git
   cd betterThanDollar
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables by creating a `.env.local` file in the root directory and adding the following values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=""
   NEXT_PUBLIC_SUPABASE_API_KEY=""

   NEXT_RAPID_API_URL="https://x66.p.rapidapi.com"
   NEXT_RAPID_API_KEY=""

   NODE_ENV="development"
   ```


### Running the Application

To start the development server:
```bash
npm run dev
```

Open your browser at `http://localhost:3000`.

## Deployment

Deploy the app using [Vercel](https://vercel.com/) for the best performance.

Already deployed at: [BetterThanDollar](https://betterthandollar.vercel.app/)

## Contributing

Feel free to submit issues and pull requests to improve the project.

## License

This project is licensed under the MIT License.

---

