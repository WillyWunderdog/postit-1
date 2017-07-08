const Groups = require('../models').Groups;
const Messages = require('../models').Messages;

module.exports = {
  create(req, res) {
    return Groups
      .create({
        name: req.body.name,
        type: req.body.type
      })
      .then(group => res.status(201).send(group))
      .catch(error => res.status(400).send(error));
  },
  fetch(req, res) {
    return Groups
      .findAll()
      .then(groups => res.status(200).send(groups))
      .catch(error => res.status(400).send(error));
  },
  addUser(req, res) {
    return '{"status": 200}';
  },
  message(req, res) {
    return Messages
      .create({
        from_user: req.body.from_user,
        to_group: req.body.to_group,
        message: req.body.message,
        priority: req.body.priority
      })
      .then(message => res.status(200).send(message))
      .catch(error => res.status(404).send(error));
  },
  messages(req, res) {
    return Messages
      .findAll({
        where: { to_group: [req.params.id] },
        attributes: ['id', 'message', 'from_user', 'to_group', 'priority']
      })
      .then(messages => res.status(200).send(messages))
      .catch(error => res.status(404).send(error));
  }
};
