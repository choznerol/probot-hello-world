module.exports = (robot) => {
  robot.log('The app was loaded!')

  /** 
   * Responding 'Hello World' to a new issue being opened
   */
  robot.on('issues.opened', async context => {
    const params = context.issue({body: 'Hello World'})
    
    return context.github.issues.createComment(params)
  })
  
  /**
   * Respond 'Pong' to comments includes 'Ping'
   */
  robot.on('issue_comment', async context => {
    const comment = context.payload.comment.body
    // robot.log('Found issue comment: ', comment)
    
    if (/(ping|Ping)/.test(comment)) {
      const params = context.issue({body: 'Pong!'})
      return context.github.issues.createComment(params)
    }
    return
  })
}
