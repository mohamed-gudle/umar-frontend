export default function Page() {
    return (
        <div><a href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}>Login with GitHub</a></div>
    );
}