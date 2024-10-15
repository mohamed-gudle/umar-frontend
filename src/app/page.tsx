"use client"
import { useGetUser } from "@/data/user"
import { Button } from "@mui/material"

export default function Page() {
    const { user, isLoading, error } = useGetUser()

    const requestURL = "https://trello.com/1/OAuthGetRequestToken"
    const accessURL = "https://trello.com/1/OAuthGetAccessToken"
    const authorizeURL = "https://trello.com/1/OAuthAuthorizeToken"
    const appName = "Trello OAuth Example"
    const scope = "read"
    const expiration = "1hour"

    if (error) {
        return <div>error</div>
    }

    if (isLoading) {
        return <div>loading</div>
    }

    return (
        <main>
            <section className="flex flex-col gap-10 gap-4 p-4">
                <p className="text-center text-2xl font-bold">Integrations</p>
                <div className="mx-6 grid grid-cols-3 gap-6 gap-y-6">
                    <div className="flex flex-col items-center justify-center gap-6 bg-[#F3F3F3] p-4">
                        <img
                            src="/github-mark.svg"
                            className="object-fit h-40 w-40"
                            alt="github"
                        />
                        <div className="flex flex-col gap-2">
                            <Button
                                variant="contained"
                                className="rounded-md bg-red-500 p-2 text-white"
                                href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
                                disabled={!user.github}
                            >
                                Connect
                            </Button>
                            <Button
                                variant="outlined"
                                className="rounded-md bg-gray-200 p-2 text-gray-500"
                                disabled={user.github}
                            >
                                Disconnect
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-6 bg-[#F3F3F3] p-4">
                        <img
                            src="/trello-logo.svg"
                            className="object-fit h-40 w-40"
                            alt="github"
                        />
                        <div className="flex flex-col gap-2">
                            <Button
                                href={`https://trello.com/1/OAuthAuthorizeToken?oauth_token`}
                                className="rounded-md bg-blue-500 p-2 text-white"
                                disabled={!user?.trello}
                            >
                                Connect
                            </Button>
                            <button
                                className="rounded-md bg-gray-200 p-2 text-gray-500"
                                disabled={!user?.github}
                            >
                                Disconnect
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-6 bg-[#F3F3F3] p-4">
                        <img
                            src="/notion-logo.svg"
                            className="object-fit h-40 w-40"
                            alt="github"
                        />
                        <div className="flex flex-col gap-2">
                            <button className="rounded-md bg-blue-500 p-2 text-white">
                                Connect
                            </button>
                            <button className="rounded-md bg-gray-200 p-2 text-gray-500">
                                Disconnect
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
