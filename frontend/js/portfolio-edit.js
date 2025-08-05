/* ✅ portfolio-edit.css - 포트폴리오 등록/수정 전용 */

.portfolio-edit {
  padding: 20px;
  background: #fff;
}

.portfolio-edit h2 {
  font-size: 20px;
  margin-bottom: 16px;
  font-weight: bold;
}

.portfolio-edit label {
  display: block;
  margin-top: 16px;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
}

.portfolio-edit input[type="text"],
.portfolio-edit input[type="number"],
.portfolio-edit input[type="url"],
.portfolio-edit input[type="file"],
.portfolio-edit textarea {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
}

#youtubeLinks {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

#addYoutubeLink {
  margin-top: 8px;
  padding: 10px;
  background: #f0f0f0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

#addYoutubeLink:hover {
  background: #e0e0e0;
}

button[type="submit"] {
  margin-top: 24px;
  width: 100%;
  padding: 14px;
  background: #6a4df4;
  color: #fff;
  border: none;
  font-size: 15px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}