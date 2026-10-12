import type { BlogPost } from "../types";

/**
 * How to get a Google Play developer account (written from Nepal).
 *
 * Facts about fees, account types, verification and the testing rule were
 * checked against Google's Play Console Help pages in October 2026. The
 * personal story (card, documents, timeline) is YOURS to fill in — every TODO
 * marks a spot only you can write. Re-check the linked pages before publishing.
 */
export const googlePlayAccountPost: BlogPost = {
    slug: "google-play-developer-account-nepal",
    title: "How I got my Google Play developer account from Nepal",
    category: "Guide",
    tags: ["google-play", "play-console", "android", "flutter", "nepal"],
    date: "2026-06-11",
    excerpt:
        "Personal or organization, why my Nabil Bank dollar card was rejected before the $25 payment finally worked, identity verification and the 12-tester rule.",
    body: [
        {
            type: "p",
            text: "Before I could publish Sajilo Khata, I needed a Google Play developer account. It looks like a five-minute signup, but it hides a few decisions: personal or organization, how to pay, an identity check, and, for new personal accounts, a testing requirement that decides your whole launch timeline. The hardest part for me was not the form but the payment: my Nepali dollar card was rejected several times before it finally worked. This post covers what I learned, with the Nepal-specific parts called out.",
        },
        {
            type: "callout",
            tone: "note",
            text: "Google changes these rules often. The facts below were checked against Google's Play Console Help pages in October 2026. Re-check the pages listed under Sources before you start.",
        },

        { type: "h2", text: "Personal or Organization?" },
        {
            type: "p",
            text: "Google offers two account types. The biggest practical difference is the testing requirement: a personal account created after November 13, 2023 must run a closed test with at least 12 testers, opted in continuously for 14 days, before it can apply for production access. That rule is aimed at personal accounts, so many people with a registered business choose an organization account to avoid it. The trade-off is that organization verification asks for business details and usually takes more paperwork.",
        },
        {
            type: "list",
            items: [
                "Personal: for solo developers. You verify with a government-issued photo ID, and the 12-tester, 14-day closed test applies to you.",
                "Organization: for a registered business. Verification is based on the organization's details, and the closed-test rule does not apply.",
            ],
        },
        {
            type: "callout",
            tone: "note",
            text: "TODO (Gambhir): say which type you picked and why. Is RedPixel Labs a registered entity, or did you go personal as a solo developer?",
        },

        { type: "h2", text: "What to prepare before you start" },
        {
            type: "list",
            items: [
                "A Google account you will keep for publishing, with 2-Step Verification turned on.",
                "To be at least 18 years old.",
                "A credit or debit card that can pay $25 USD internationally.",
                "A government-issued photo ID for identity verification.",
                "A phone number and email you can receive codes on.",
                "A real Android phone, because new personal accounts also go through device verification.",
            ],
        },

        { type: "h2", text: "Step by step" },
        {
            type: "list",
            ordered: true,
            items: [
                "Open the Play Console sign-up page and sign in with the Google account you chose.",
                "Choose Personal or Organization.",
                "Enter your developer name (it is public, so choose one you are happy to show) and your contact details, then verify your email and phone.",
                "Accept the Developer Distribution Agreement and Console Terms of Service.",
                "Pay the one-time $25 registration fee.",
                "Submit your identity documents and wait for verification.",
                "Track the status from the All apps page; Google emails the account owner when it finishes.",
            ],
        },

        { type: "h2", text: "Paying the $25 fee from Nepal: my card was rejected" },
        {
            type: "p",
            text: "The fee is one-time, not yearly, and Google takes it by credit or debit card. If Google later decides your information is invalid, the fee is not refunded, so check every detail before you pay. For us in Nepal, the real question is whether your card works for international USD payments.",
        },
        {
            type: "p",
            text: "This was the hardest part of the whole process for me. I tried to pay with my Nabil Bank dollar card, and the payment was rejected multiple times. I had filled in everything correctly, so the form was not the problem, and retrying did not change anything.",
        },
        {
            type: "p",
            text: "Instead of trying again and again, I emailed the bank and asked about the rejections. With their help, and a fix on their side, my next attempt went through and I paid the $25.",
        },
        {
            type: "p",
            text: "The lesson: if your Nepali dollar card is rejected, stop retrying and contact your bank. A card that works for other things can still be blocked for this payment, so ask the bank directly. These are the questions I would ask them:",
        },
        {
            type: "list",
            items: [
                "Is international (foreign currency) payment enabled on my card?",
                "Are online or e-commerce transactions enabled?",
                "Is there a per-transaction or daily limit that blocks a $25 payment?",
                "Can you see the declined attempts on your side, and what reason do they show?",
            ],
        },
        {
            type: "callout",
            tone: "note",
            text: "TODO (Gambhir): tell readers what Nabil Bank actually changed (for example enabling international or online payments, or raising a limit), what you wrote in your email, how long they took to reply, and what the $25 cost in NPR including conversion. These details are what other Nepali developers are searching for.",
        },

        { type: "h2", text: "Identity verification" },
        {
            type: "p",
            text: "Google says verification takes roughly three business days, and you get a limited number of attempts. While you wait you can still use many Console features to prepare your app. One failure cause worth knowing: the account type on your payments profile must match your developer account type, so do not mix an organization payments profile with a personal developer account, or the reverse. Accepted documents vary by country, and Google publishes a page called Required documents by country and region.",
        },
        {
            type: "callout",
            tone: "note",
            text: "TODO (Gambhir): which document did you use, how did you photograph it, and how long did verification actually take?",
        },

        { type: "h2", text: "The catch for new personal accounts" },
        {
            type: "p",
            text: "Even after verification, a new personal account cannot publish publicly yet. You must first run a closed test with at least 12 opted-in testers for 14 continuous days, then apply for production access. If any tester drops out and you fall below 12, the countdown can be affected, so recruit more than the minimum. Budget about three weeks for a first launch, and start recruiting testers before your app is finished. The next post covers the full release process.",
        },

        { type: "h2", text: "Mistakes worth avoiding" },
        {
            type: "list",
            items: [
                "Assuming a Nepali dollar card will work on the first try. Check international payments with your bank before you start, and if a payment is rejected, contact the bank instead of retrying.",
                "Creating the account with a throwaway Google account you may lose access to.",
                "Choosing the wrong account type and having to redo verification.",
                "Submitting blurry or cropped ID photos, or details that do not match your documents.",
                "Leaving tester recruitment until the app is done, which adds weeks to your launch.",
            ],
        },

        { type: "h2", text: "My timeline" },
        {
            type: "callout",
            tone: "note",
            text: "TODO (Gambhir): list your real dates, for example: day 0 sign-up and payment, day N identity verified, day N closed test started, day N production access granted. Honest numbers are the most useful part of this post.",
        },

        { type: "h2", text: "Sources" },
        {
            type: "list",
            items: [
                "Create and set up your Play Console developer account: support.google.com/googleplay/android-developer/answer/6112435",
                "Verify your identity: support.google.com/googleplay/android-developer/answer/9198012",
                "App testing requirements for new personal accounts: support.google.com/googleplay/android-developer/answer/14151465",
            ],
        },
    ],
    link: {
        label: "Next: how I released the app on Google Play",
        href: "/blog/release-flutter-app-google-play",
    },
};