// const express = require('express');
// const core = require('../schemas/core');

// const router = express.Router();

// // axios.post('/comments', { id, comment }); 로부터 요청 받음
// router.post('/', async (req, res, next) => {
//   try {
//     // Comment 스키마(컬렉션)에 데이터를 insert한다.
//     const comment = await core.create({ 
//       commenter: req.body.id, // 유저 스키마의 아이디 (_id)
//       comment: req.body.comment, // 댓글 내용
//     });
//     console.log(comment);

//     // 위의 comment 쿼리결과에서 commenter 키에 populate를 설정해주면, objectid인 필드값을 실제 user 임베디드 다큐먼트로 매핑해주게 된다
//     const result = await core.populate(comment, { path: 'commenter' });
//     res.status(201).json(result);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });


// router.route('/:id')
//   // axios.patch(`/comments/${comment._id}`, { comment: newComment }); 로부터 요청 받음
//   .patch(async (req, res, next) => {
//     try {
//       // Comment 스키마 업데이트
//       const result = await core.update({
//         _id: req.params.id, // 업데이트 대상 검색
//       }, {
//         comment: req.body.comment, // 업데이트 내용. 원래는 $set해줘야 되지만 몽구스는 알아서 보호가 된다.
//       });
//       res.json(result);
//     } catch (err) {
//       console.error(err);
//       next(err);
//     }
//   })
  
//   // axios.delete(`/comments/${comment._id}`);로부터 요청 받음
//   .delete(async (req, res, next) => {
//     try {
//       // Comment 스키마 삭제
//       const result = await core.deleteOne({ _id: req.params.id });
//       res.json(result);
//     } catch (err) {
//       console.error(err);
//       next(err);
//     }
//   });

// module.exports = router;