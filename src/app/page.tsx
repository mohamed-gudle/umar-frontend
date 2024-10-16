"use client"
import { createIssue } from "@/data/github"
import { authorize } from "@/data/trello"
import { useGetUser } from "@/data/user"
import LoadingButton from "@mui/lab/LoadingButton"
import { Button, MenuItem, Select, TextField, InputLabel } from "@mui/material"
import useSWRMutation from "swr/mutation"
import { useState } from "react"

export default function Page() {
  const {
    trigger,
    isMutating,
    data,
    error: err,
  } = useSWRMutation("/trello/authorize", authorize)
  const { user, isLoading, error } = useGetUser();
  const {
    trigger: createIssueTrigger,
    isMutating: isCreatingIssue,
    data: issueData,
    error: issueError
  } = useSWRMutation("/github/createIssue", createIssue);

  const [repository, setRepository] = useState<string>("")
const [issueTitle, setIssueTitle] = useState<string>("")
const [issueDescription, setIssueDescription] = useState<string>("")



  const requestURL = `https://trello.com/1/OAuthGetRequestToken?key=${process.env.NEXT_PUBLIC_TRELLO_API_KEY}&name=Integrations&expiration=never&scope=read,write&response_type=token`

  if (error) {
    return <div>error</div>
  }

  if (isLoading) {
    return <div>loading</div>
  }

  const handleTrelloConnect = async () => {
    try {
      const redirectURL = await trigger()
      console.log(redirectURL)
      window.location.href = redirectURL
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateIssue = async () => {
    try {
      const response = await createIssueTrigger({
        repository,
        title: issueTitle,
        body: issueDescription
        });
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
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
                disabled={user.github}
              >
                Connect
              </Button>
              <Button
                variant="outlined"
                className="rounded-md bg-gray-200 p-2 text-gray-500"
                disabled={!user.github}
              >
                Disconnect
              </Button>
            </div>

            <div className="flex flex-col gap-2">
              <InputLabel id="select-repo">Select Repository</InputLabel>
              <Select
                id="select-repo"
                fullWidth
                value={repository}
                onChange={(e) => setRepository(e.target.value as string)}
              >
                {user.repositories.map((repo: { id: string; name: string }) => (
                  <MenuItem key={repo.id} value={repo.id}>
                    {repo.name}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                fullWidth
                label="Issue Title"
                variant="outlined"
                value={issueTitle}
                onChange={(e) => setIssueTitle(e.target.value)}
              />
              <TextField
                fullWidth
                label="Issue Description"
                variant="outlined"
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
              />
              <LoadingButton
                loading={isCreatingIssue}
                variant="contained"
                sx={{ color: "white", backgroundColor: "#34D399" }}
                onClick={handleCreateIssue}

              >
                Create Issue
              </LoadingButton>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-6 bg-[#F3F3F3] p-4">
            <img
              src="/trello-logo.svg"
              className="object-fit h-40 w-40"
              alt="github"
            />
            <div className="flex flex-col gap-2">
              <LoadingButton
                variant="contained"
                loading={isMutating}
                onClick={handleTrelloConnect}
                disabled={user?.trello}
              >
                Connect
              </LoadingButton>
              <button
                className="rounded-md bg-gray-200 p-2 text-gray-500"
                disabled={!user?.trello}
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
