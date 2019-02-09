exports.register = async (req, res) => {
  console.log(req.body);
  return res.status(200).json({
    message: 'success',
  });
};
exports.login = async (req, res) => {
  console.log(req.body);
  return res.status(200).json({
    message: 'success',
  });
};
