"use strict";

const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/product-repository");
const azure = require("azure-storage");
const config = require("../config");
const guid = require("guid");

exports.get = async (req, res, next) => {
  try {
    var data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao listar os produtos",
    });
  }
};

exports.getBySlug = async (req, res, next) => {
  try {
    var data = await repository.getBySlug(req.params.slug);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao listar os produtos",
    });
  }
};

exports.getById = async (req, res, next) => {
  try {
    var data = await repositoray.getById(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao listar os produtos",
    });
  }
};

exports.getByTag = async (req, res, next) => {
  try {
    var data = await repository.getByTag(req.params.tag);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao listar os produtos",
    });
  }
};

exports.post = async (req, res, next) => {
  const contract = new ValidationContract();

  contract.hasMinLen(
    req.body.title,
    3,
    "O título do produto deve conter pelo menos 3 caracteres"
  );
  contract.hasMinLen(
    req.body.slug,
    3,
    "O slug do produto deve conter pelo menos 3 caracteres"
  );
  contract.hasMinLen(
    req.body.slug,
    10,
    "A descrição do produto deve conter pelo menos 10 caracteres"
  );

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    // const blobService = azure.createBlobService(
    //   config.userImagesBlobConnectionString
    // );
    // let fileName = guid.raw().toString() + ".jpg";
    // let rawData = req.body.image;
    // let matches = rawData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    // let type = matches[1];
    // let buffer = new Buffer(matches[2], "base64");

    // await blobService.createBlockBlobFromText(
    //   "product-images",
    //   fileName,
    //   buffer,
    //   {
    //     contentType: type,
    //   },
    //   function (error, result, response) {
    //     if (error) {
    //       filename = "default-product.png";
    //     }
    //   }
    // );

    

    await repository.create({
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      price: req.body.price,
      active: true,
      tags: req.body.tags,
      image:
        "https://divasapi.blob.core.windows.net/product-images/" + fileName,
    });
    res.status(201).send({ message: "Produto cadastrado com sucesso!" });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao listar os produtos",
    });
  }
};

exports.put = async (req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    res.status(200).send({
      message: "Produto atualizado com sucesso!",
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao listar os produtos",
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.body.id);
    res.status(200).send({ message: "Produto removido com sucesso!" });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao listar os produtos",
    });
  }
};
