import React from 'react';

type WordCardProps = {
  word: string;
  reading: string;
  meaning: string;
  memorized: boolean;
  onToggle: () => void;
  onNext: () => void;
  onPrev: () => void;
};

function extractKanjiCharacters(text: string): string[] {
  return Array.from(text).filter((char) => /[一-龯]/.test(char));
}

export const WordCard: React.FC<WordCardProps> = ({ word, reading, meaning, memorized, onToggle, onNext, onPrev }) => {
  const kanjiList = extractKanjiCharacters(word);

  return (
    <div style={{ height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{word}</div>
      <div style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#666' }}>{reading}</div>
      <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{meaning}</div>
      <div style={{ marginBottom: '2rem' }}>
        {kanjiList.map((kanji) => (
          <a
            key={kanji}
            href={`https://hanja.dict.naver.com/hanja?q=${kanji}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}
          >
            {kanji}
          </a>
        ))}
        <span style={{ fontSize: '1.2rem' }}>(한자 뜻 보기)</span>
      </div>
      <button onClick={onToggle} style={{ marginBottom: '1rem' }}>
        {memorized ? '복습하기' : '외웠어요'}
      </button>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={onPrev}>이전 단어</button>
        <button onClick={onNext}>다음 단어</button>
      </div>
    </div>
  );
};