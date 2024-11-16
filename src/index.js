import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Showlist from './components/pages/ShowList';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

function App() {
  const [musicData, setMusicData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    date: '',
    artist: '',
    label: '',
    genre: '',
  });
  const [isEdit, setIsEdit] = useState(false);

  // 음악 데이터를 가져오는 함수
  const getMusic = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://672819af270bd0b975545de3.mockapi.io/music');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.response);
        setMusicData(res);
      } else {
        console.error(`Error: ${xhr.status} ${xhr.statusText}`);
      }
    };
  };

  useEffect(() => {
    getMusic();
  }, []);

  // 모달 열기 함수
  const openAddModal = () => {
    setFormData({
      id: '',
      title: '',
      date: '',
      artist: '',
      label: '',
      genre: '',
    });
    setIsEdit(false);
    setShowModal(true);
  };

  // 수정 모달 열기
  const openEditModal = (music) => {
    setFormData(music);
    setIsEdit(true);
    setShowModal(true);
  };

  // 데이터 추가
  const postData = () => {
    const data = {
      title: formData.title,
      date: formData.date,
      artist: formData.artist,
      label: formData.label,
      genre: formData.genre,
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://672819af270bd0b975545de3.mockapi.io/music');
    xhr.setRequestHeader('content-type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify(data));
    xhr.onload = () => {
      if (xhr.status === 201) {
        getMusic();
        setShowModal(false);
      } else {
        console.log(xhr.status, xhr.statusText);
      }
    };
  };

  // 데이터 수정
  const updateData = () => {
    const id = formData.id;
    const data = {
      title: formData.title,
      date: formData.date,
      artist: formData.artist,
      label: formData.label,
      genre: formData.genre,
    };

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', 'https://672819af270bd0b975545de3.mockapi.io/music/' + id);
    xhr.setRequestHeader('content-type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify(data));
    xhr.onload = () => {
      if (xhr.status === 200) {
        getMusic();
        setShowModal(false);
      } else {
        console.log(xhr.status, xhr.statusText);
      }
    };
  };

  // 데이터 삭제
  const deleteData = () => {
    const id = formData.id;
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'https://672819af270bd0b975545de3.mockapi.io/music/' + id);
    xhr.onload = () => {
      if (xhr.status === 200) {
        getMusic();
        setShowModal(false);
      } else {
        console.log(xhr.status, xhr.statusText);
      }
    };
    xhr.send();
  };

  return (
    <div className="container">
      <h1>음악 관리 시스템</h1>

      {/* 음악 목록을 렌더링 */}
      <Showlist musicData={musicData} openEditModal={openEditModal} />

      {/* 음악 추가 버튼 */}
      <Button variant="success" onClick={openAddModal}>
        새 음악 추가
      </Button>

      {/* 모달 컴포넌트 */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? '음악 수정' : '새 음악 추가'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="제목"
            className="form-control"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <input
            type="date"
            className="form-control mt-2"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="아티스트"
            className="form-control mt-2"
            value={formData.artist}
            onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="레이블"
            className="form-control mt-2"
            value={formData.label}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="장르"
            className="form-control mt-2"
            value={formData.genre}
            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            닫기
          </Button>
          {isEdit ? (
            <>
              <Button variant="warning" onClick={updateData}>
                수정하기
              </Button>
              <Button variant="danger" onClick={deleteData}>
                삭제하기
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={postData}>
              추가하기
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
