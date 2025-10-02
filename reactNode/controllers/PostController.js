// Работа со статьями

import PostModel from "../models/Post.js";

// получение всех статей
export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec(); // получаем статьи и пользователя
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "не удалось получить статьи",
    });
  }
};

// получение одной статьи
export const getOne = async (req, res) => {
  try {
    const postId = req.params.id; // получение id статьи

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 }, // увеличение просмотров статьи
      },
      {
        returnDocument: "after", // возврат обновленного документа
      },
    ).then((doc, err) => {
      if (err) {
        // проверка на ошибку
        console.log(err);
        return res.status(500).json({
          message: "не удалось вернуть статью",
        });
      }
      if (!doc) {
        // проверка на отсутствие статьи
        return res.status(404).json({
          message: "статья не найдена",
        });
      }

      res.json(doc);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "не удалось получить статьи",
    });
  }
};

// удаление статьи
export const remove = async (req, res) => {
  try {
    const postId = req.params.id; // получение id статьи

    PostModel.findOneAndDelete({
      _id: postId,
    }).then((doc, err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "не удалось удалить статью",
        });
      }

      if (!doc) {
        return res.status(404).json({
          message: " не удалось найти статью",
        });
      }
      res.json({
        saccess: true,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "не удалось получить статьи",
    });
  }
};

// создание статьи
export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "не удалось создать статью",
    });
  }
};

// обновление статьи
export const update = async (req,res) =>{
    try {
        const postId = req.params.id

        //поиск и обновления статьи
        await PostModel.updateOne({
            _id: postId,
        },
        {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.userId,
            tags: req.body.tags,
        }
    )
        res.json({
            success:true
        })
    } catch (error) {
        console.log(error);
        res.json({
            message: " не удалось обновить статью"
        })
        
    }
}