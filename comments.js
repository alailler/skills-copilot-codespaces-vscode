// Create web server
// -----------------

// Require modules
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const sanitizeHtml = require('sanitize-html');
const template = require('../lib/template.js');

// Define comments path
const commentsPath = './data/comments.json';

// Create comments file if it doesn't exist
if(!fs.existsSync(commentsPath)) {
  fs.writeFileSync(commentsPath, '[]', 'utf8');
}

// Read comments file
const comments = JSON.parse(fs.readFileSync(commentsPath, 'utf8'));

// Route: /comments
router.get('/', (req, res) => {
  const list = template.list(req.list);
  const html = template.HTML('Comments', list,
    `
      <form action="/comments/create_process" method="post">
        <p><input type="text" name="name" placeholder="name"></p>
        <p><textarea name="comment" placeholder="comment"></textarea></p>
        <p><input type="submit" value="submit"></p>
      </form>
    `,
    ''
  );
  res.send(html);
});

// Route: /comments/create_process
router.post('/create_process', (req, res) => {
  // Get data from form
  let post = req.body;
  let name = post.name;
  let comment = post.comment;
  // Sanitize user input
  let sanitizedComment = sanitizeHtml(comment);
  // Add comment to comments array
  comments.push({
    name: name,
    comment: sanitizedComment
  });
  // Write comments array to comments file
  fs.writeFile(commentsPath, JSON.stringify(comments), 'utf8', (err) => {
    if(err) throw err;
    console.log('The comments file has been saved!');
  });
  // Redirect to comments page
  res.redirect('/comments');
});

// Export router
module.exports = router;