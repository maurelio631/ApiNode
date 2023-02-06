"use strict";
const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/customer-repository");

exports.get = async (req, res, next) => {
  try {
    var data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao listar os clientes",
    });
  }
};

exports.post = async (req, res, next) => {
  const contract = new ValidationContract();

  contract.hasMinLen(
    req.body.name,
    3,
    "O nome do cliente deve conter pelo menos 3 caracteres"
  );
  contract.isEmail(
    req.body.email,
    "E-mail inválido"
  );
  contract.hasMinLen(
    req.body.password,
    6,
    "A senha deve conter pelo menos 6 caracteres"
  );

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    await repository.create(req.body);
    res.status(201).send({ message: "Cliente cadastrado com sucesso!" });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao cadastrar cliente",
    });
  }
};