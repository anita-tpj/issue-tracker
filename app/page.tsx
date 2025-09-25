import LatestIssues from "@/app/LatestIssues";
import IssuesSummary from "@/app/IssuesSummary";

export default async function Home() {

  return (
      <>
          <LatestIssues />
          <IssuesSummary />
      </>
  )
}
