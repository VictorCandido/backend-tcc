module.exports = {
    production: false,
    wikipediaApiUrl: 'https://en.wikipedia.org/w/api.php',
    mongooseConnector: 'mongodb+srv://integrador:root@candido-cluster-y9wuq.mongodb.net/tcc?retryWrites=true&w=majority',
    typeMessages: {
        start_conversation_answer: 'startConversation-answer',
        not_allowed: 'category-not-allowed',
        question_success: 'question-success',
        util: 'util-sim',
        db_answer: 'db-answer',
        not_found: 'answer-not-found',
        chat_answer: 'chat-answer',
    },
    systemRelevance: 0.2
};