import { message, danger, fail } from 'danger'

const docs = danger.git.fileMatch('**/*.md')
const app = danger.git.fileMatch('src/**/*.ts')
const tests = danger.git.fileMatch('*/__tests__/*')

const assignee = danger.github.pr.assignee

const modifiedMD = danger.git.modified_files.join('- ')
message('Changed Files in this PR: \n - ' + modifiedMD)

/* Check that an assignee exists */
if (assignee === null) {
  fail('This PR needs an assignee to pass')
}
