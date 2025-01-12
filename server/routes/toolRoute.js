const express = require('express');
const { addTool, getTools, issueTool, returnTool, getIssuedTools , editTool , deleteTool ,getIssueToolByAdmin } = require('../controllers/toolController');
const router = express.Router();

router.post('/add', addTool);
router.get('/', getTools);
router.post('/issue', issueTool);
router.post('/return', returnTool);
router.post('/get-issued-tools', getIssuedTools);
router.get('/issue-tool-by-admin', getIssueToolByAdmin);
router.put('/edit/:id', editTool);
router.delete('/delete/:id', deleteTool);

module.exports = router;
