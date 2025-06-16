import { useState, useEffect } from 'react';
import './App.css';
import { WordCard } from './components/WordCard';
import wordData from './data/n3words.json';


function App() {
  const [memorized, setMemorized] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('memorized') || '[]');
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [tab, setTab] = useState<'all' | 'notMemorized'>('notMemorized');

  const toggleMemorized = (word: string) => {
    const updated = memorized.includes(word)
      ? memorized.filter(w => w !== word)
      : [...memorized, word];
    setMemorized(updated);
    localStorage.setItem('memorized', JSON.stringify(updated));
  };

  const wordList = tab === 'all' ? wordData : wordData.filter(w => !memorized.includes(w.word));

  useEffect(() => {
    setCurrentIndex(0);
  }, [tab, memorized]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % wordList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + wordList.length) % wordList.length);
  };

  const currentWord = wordList[currentIndex];

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
        <button onClick={() => setTab('notMemorized')} style={{ fontWeight: tab === 'notMemorized' ? 'bold' : 'normal' }}>못 외운 단어</button>
        <button onClick={() => setTab('all')} style={{ fontWeight: tab === 'all' ? 'bold' : 'normal' }}>전체 보기</button>
      </div>
      {currentWord ? (
        <WordCard
          key={currentWord.word}
          word={currentWord.word}
          reading={currentWord.reading}
          meaning={currentWord.meaning}
          memorized={memorized.includes(currentWord.word)}
          onToggle={() => toggleMemorized(currentWord.word)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      ) : (
        <div style={{ padding: '2rem', textAlign: 'center' }}>🎉 모든 단어를 외우셨습니다!</div>
      )}
    </div>
  );
}

export default App;