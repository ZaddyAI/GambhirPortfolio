import type { BlogPost } from "../types";

/**
 * How to release a Flutter app on Google Play (using Sajilo Khata as the case).
 *
 * Release steps follow the Flutter docs (docs.flutter.dev/deployment/android)
 * and Google's Play Console Help, checked October 2026. The personal story is
 * YOURS to fill in — every TODO marks a spot only you can write.
 */
export const releaseFlutterAppPost: BlogPost = {
    slug: "release-flutter-app-google-play",
    title: "How I released my Flutter app on Google Play",
    category: "Guide",
    tags: ["flutter", "google-play", "android", "release", "app-bundle"],
    date: "2026-08-09",
    image: "/images/projects/sajilo-khata/dashboard.png",
    alt: "Sajilo Khata dashboard screen",
    excerpt:
        "Signing, building the app bundle, the Play Console declarations, closed testing and production access — the full path from flutter build to a live Play Store listing.",
    body: [
        {
            type: "p",
            text: "Getting a developer account is only half the job. Releasing Sajilo Khata meant a signed app bundle, a store listing, a pile of policy declarations and, on a new personal account, a closed test before production. Here is the whole path in order.",
        },
        {
            type: "callout",
            tone: "note",
            text: "Requirements below were checked in October 2026 against the Flutter docs and Google's Play Console Help. Google changes them regularly, so re-check the sources at the end.",
        },

        { type: "h2", text: "The release path at a glance" },
        {
            type: "list",
            ordered: true,
            items: [
                "Prepare the project: application ID, icon, manifest, target SDK, version.",
                "Create an upload key and sign release builds.",
                "Build the app bundle (.aab).",
                "Create the app in Play Console.",
                "Complete the App content declarations.",
                "Fill in the store listing.",
                "Test on the internal track, then run the closed test.",
                "Apply for production access, release, and wait for review.",
            ],
        },

        { type: "h2", text: "1. Prepare the Flutter project" },
        {
            type: "p",
            text: "The applicationId is your app's permanent identity on Google Play. Use a reverse-domain ID you own, and get it right before the first upload, because you cannot change it afterwards. Replace the default launcher icon (the flutter_launcher_icons package automates this), set a final android:label in the manifest, and add the INTERNET permission if your app uses the network. Sajilo Khata also declares READ_SMS and RECEIVE_SMS, which come with extra requirements covered below.",
        },
        {
            type: "p",
            text: "Also check your target SDK. Since August 31, 2026, new apps and app updates on Google Play must target Android 16 (API level 36). Flutter fills these values from its own defaults, so open the file and confirm the number before you build, because Play Console will refuse a bundle that targets too low.",
        },
        {
            type: "code",
            language: "kotlin",
            filename: "android/app/build.gradle.kts",
            code: `android {
    namespace = "com.yourname.yourapp"
    compileSdk = flutter.compileSdkVersion

    defaultConfig {
        applicationId = "com.yourname.yourapp" // permanent once uploaded
        minSdk = flutter.minSdkVersion
        targetSdk = flutter.targetSdkVersion   // confirm this meets Play's requirement
        versionCode = flutter.versionCode
        versionName = flutter.versionName
    }
}`,
        },
        {
            type: "p",
            text: "Versioning lives in pubspec.yaml. The part before the plus sign becomes versionName, and the number after it becomes versionCode. Google Play rejects an upload whose versionCode is not higher than the previous one, so bump the build number on every release.",
        },
        {
            type: "code",
            language: "yaml",
            filename: "pubspec.yaml",
            code: `version: 1.0.0+1   # 1.0.0 = versionName, 1 = versionCode`,
        },

        { type: "h2", text: "2. Sign the app" },
        {
            type: "p",
            text: "Android uses two keys. You sign what you upload with an upload key, and Google re-signs what users download with the app signing key under Play App Signing. Create the upload keystore once:",
        },
        {
            type: "code",
            language: "bash",
            filename: "terminal (macOS / Linux)",
            code: `keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA \\
        -storetype JKS -keysize 2048 -validity 10000 -alias upload`,
        },
        {
            type: "p",
            text: "Then create android/key.properties that points to it. On Windows, the path in this file needs double backslashes.",
        },
        {
            type: "code",
            language: "properties",
            filename: "android/key.properties",
            code: `storePassword=<your-keystore-password>
keyPassword=<your-key-password>
keyAlias=upload
storeFile=<path-to-upload-keystore.jks>`,
        },
        {
            type: "p",
            text: "Finally, tell Gradle to load that file and sign release builds with it:",
        },
        {
            type: "code",
            language: "kotlin",
            filename: "android/app/build.gradle.kts",
            code: `import java.util.Properties
import java.io.FileInputStream

val keystoreProperties = Properties()
val keystorePropertiesFile = rootProject.file("key.properties")
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(FileInputStream(keystorePropertiesFile))
}

android {
    signingConfigs {
        create("release") {
            keyAlias = keystoreProperties.getProperty("keyAlias")
            keyPassword = keystoreProperties.getProperty("keyPassword")
            storeFile = keystoreProperties.getProperty("storeFile")?.let { file(it) }
            storePassword = keystoreProperties.getProperty("storePassword")
        }
    }
    buildTypes {
        release {
            signingConfig = signingConfigs.getByName("release")
        }
    }
}`,
        },
        {
            type: "callout",
            tone: "warning",
            text: "Never commit your keystore or key.properties to Git, especially in a public repository like mine. Add both to .gitignore and keep a backup somewhere safe. With Play App Signing Google has a process for resetting a lost upload key, but it costs you days.",
        },

        { type: "h2", text: "3. Build the app bundle" },
        {
            type: "p",
            text: "Google Play prefers the app bundle format over APKs. If you changed Gradle files, run flutter clean first so cached builds do not affect signing. R8 code shrinking is enabled by default in release builds.",
        },
        {
            type: "code",
            language: "bash",
            filename: "terminal",
            code: `flutter clean
flutter build appbundle
# output: build/app/outputs/bundle/release/app.aab`,
        },
        {
            type: "p",
            text: "Before the real launch, test the bundle. You can generate APKs from it with Google's bundletool, or upload it to the internal testing track and install it from Google Play on your own device.",
        },

        { type: "h2", text: "4. Create the app in Play Console" },
        {
            type: "p",
            text: "In Play Console choose All apps, then Create app. Draft your text first, because the limits are tight: the app title is 30 characters at most and the short description is 80. You will also need a 512x512 app icon and screenshots for the store listing.",
        },

        { type: "h2", text: "5. App content declarations" },
        {
            type: "p",
            text: "Under Policy and programs, then App content, Play Console lists declarations you must finish before release. This is where most first submissions stall.",
        },
        {
            type: "list",
            items: [
                "Privacy policy: an active URL that covers your app. For apps that request sensitive permissions, the policy must be linked on the listing and shown inside the app.",
                "App access: if features need a login, give reviewers a working test account. Sajilo Khata has Google and email login, so this applies.",
                "Ads, content rating and target audience: short questionnaires, but answer them honestly.",
                "Data safety: declare what your app collects and shares. It must match your privacy policy, and most rejections come from third-party SDK behavior the developer did not account for.",
                "Account deletion: if users can create an account in your app, check Google's current requirements for letting them delete it.",
                "Permissions declaration form: required for restricted permissions like SMS.",
            ],
        },
        {
            type: "callout",
            tone: "note",
            text: "For Sajilo Khata, the data safety form had to cover every SDK in the stack: Firebase Auth and Google Sign-In for login, Firestore for storage and sync, FCM and local notifications, and the exchange-rate API. List them all, and make the privacy policy say the same things.",
        },

        { type: "h2", text: "The SMS declaration" },
        {
            type: "p",
            text: "Sajilo Khata reads bank SMS, so it declares READ_SMS and RECEIVE_SMS. Google restricts those permissions, which means filling in the permissions declaration form and explaining the core feature that needs SMS access. I wrote about the technical side in the [SMS post](/blog/reading-bank-sms-in-flutter).",
        },
        {
            type: "callout",
            tone: "warning",
            text: "TODO (Gambhir): describe the declaration you submitted, including what you wrote and how you demonstrated the feature. Say whether it was approved first time, how long it took, and what you would change. This is the part other developers search for.",
        },

        { type: "h2", text: "6. Test before production" },
        {
            type: "p",
            text: "Start with the internal testing track for quick iteration with yourself and a few friends. If your personal account is new, the real gate is the closed test: at least 12 testers must be opted in continuously for 14 days before you can apply for production access. Sending invitations is not enough, because each tester has to accept the opt-in link, and they must stay opted in for the whole 14 days. Recruit more than 12 to survive dropouts, and keep them engaged, since Google asks you to summarize your testing feedback when you apply.",
        },
        {
            type: "callout",
            tone: "note",
            text: "TODO (Gambhir): how did you find your testers (friends, classmates, communities)? How many did you start with, did anyone drop out, and what feedback did you act on?",
        },

        { type: "h2", text: "7. Apply for production and release" },
        {
            type: "p",
            text: "After the 14 days, Play Console offers a production access questionnaire. Once Google grants access, create a production release, upload or promote your bundle, add release notes and roll it out. Google then reviews the app before it goes live.",
        },
        {
            type: "callout",
            tone: "note",
            text: "TODO (Gambhir): give your real numbers: days from first upload to live, whether production access was approved the first time, and review time for the first release versus updates.",
        },

        { type: "h2", text: "After launch" },
        {
            type: "list",
            items: [
                "Raise the build number in pubspec.yaml for every upload.",
                "Expect an annual target API deadline. Existing apps must target at least Android 15 (API 35) to stay available to new users on newer devices, and new releases follow the latest target.",
                "Watch crashes and ANRs in Play Console, and read user reviews.",
            ],
        },

        { type: "h2", text: "What I would do differently" },
        {
            type: "list",
            items: [
                "TODO: one thing you would prepare earlier (privacy policy, screenshots, testers).",
                "TODO: one mistake that cost you time.",
                "TODO: what you automated afterwards, if anything, such as CI builds.",
            ],
        },

        { type: "h2", text: "Sources" },
        {
            type: "list",
            items: [
                "[Flutter: Build and release an Android app](https://docs.flutter.dev/deployment/android)",
                "[Google Play: Target API level requirements](https://support.google.com/googleplay/android-developer/answer/11926878)",
                "[Google Play: App testing requirements for new personal accounts](https://support.google.com/googleplay/android-developer/answer/14151465)",
                "[Google Play: Declarations about your app content](https://support.google.com/googleplay/android-developer/answer/9859455)",
            ],
        },
    ],
    link: {
        label: "First read: how I got the developer account",
        href: "/blog/google-play-developer-account-nepal",
    },
};