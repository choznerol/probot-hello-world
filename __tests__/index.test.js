const { createRobot } = require('probot')
const app = require('../index');
const issue_opened = require('./fixtures/payload/issues.opened')
const issue_comment = require('./fixtures/payload/issue_comment')

test('Tests can run', () => {
  expect(1 + 1).toBe(2)
})

// TODO: Check out https://github.com/gr2m/wip-bot/blob/master/test/unit/lib/handle-pull-request-change.test.js

describe('Main app (index.js)', () => {
  let robot
  let github

  // Setup
  beforeEach(() => {
    robot = createRobot()
    app(robot)
    // Mock GitHub API
    github = {
      issues: {
        createComment: jest.fn().mockReturnValue(Promise.resolve({}))
      }
    }
    robot.auth = () => Promise.resolve(github)
  })

  it('Reply \'Hello World\' to new issue', async () => {
    await robot.receive(issue_opened);
    const reply = github.issues.createComment.mock.calls[0][0]["body"];

    expect(reply).toBe("Hello World");
  });

  it('Reply \'Pong!\' to issue comment includes \'ping\'', async () => {
    await robot.receive(issue_comment);
    console.log(github.issues.createComment.mock);
    const reply = github.issues.createComment.mock.calls[0][0]["body"];

    expect(reply).toBe('Pong!');
  });
})
