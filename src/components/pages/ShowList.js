function Showlist({ musicData, openEditModal }) {
  return (
    <div>
      <h2>음악 목록</h2>
      <ul>
        {musicData.map((music) => (
          <li
            key={music.id}
            onClick={() => openEditModal(music)}
            style={{ cursor: 'pointer', transition: 'background-color 0.3s, font-weight 0.3s' }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f0f0';
              e.currentTarget.style.fontWeight = 'bold';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '';
              e.currentTarget.style.fontWeight = 'normal';
            }}
          >
            [{music.genre}] {music.title} ({music.artist}) {music.date} {music.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Showlist;
