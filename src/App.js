import React, { useState } from "react";
import styled from "styled-components";

// ======= 전역 Background (옵션) =======
const Background = styled.div`
  /* 몽환적 그라디언트 배경 예시 */
  background: linear-gradient(135deg, #c9c6ff, #fbc7d4);
  min-height: 100vh;
  padding: 20px 0;
`;

// ======= Styled Components =======
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center; /* 전체 가운데 정렬 */
  font-family: "Helvetica", "Arial", sans-serif;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.7); /* 살짝 투명한 흰 배경 */
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2); /* 부드러운 그림자 */
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  color: #4e3d77; /* 몽환적인 보라 톤 */
`;

const SubTitle = styled.h2`
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  color: #5e4b8a;
`;

const SpreadSetup = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: inline-block;
  margin: 0.5rem 0;
  color: #333;
  font-weight: 600;
`;

const Select = styled.select`
  font-size: 1rem;
  padding: 0.3rem;
  margin-left: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const TextInput = styled.input`
  font-size: 1rem;
  padding: 0.3rem;
  margin-left: 0.5rem;
  width: 60%;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  font-size: 1rem;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  background-color: #6e57c3;
  color: #fff;
  transition: background-color 0.3s;
  &:hover {
    background-color: #5a47a0;
  }
`;

const SpreadPositionsContainer = styled.div`
  margin-bottom: 2rem;
`;

const PositionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center; /* 카드 자리도 가운데 정렬 */
`;

const PositionCard = styled.div`
  flex: 1 1 calc(33.33% - 10px);
  max-width: 300px; /* 너무 커지지 않도록 제한 */
  border: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
  min-height: 100px;
  cursor: pointer;
  text-align: center;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const PositionLabelInput = styled.input`
  width: 90%;
  font-size: 0.9rem;
  text-align: center;
  border: none;
  background-color: transparent;
  font-weight: bold;
  color: #4e3d77;
  margin-bottom: 5px;

  &:focus {
    outline: 1px solid #ccc;
    background-color: #fff;
  }
`;

const PositionImage = styled.img`
  max-width: 100%;
  margin-top: 5px;
  border-radius: 5px;
`;

const DeckSection = styled.div`
  margin-bottom: 2rem;
`;

const DeckGroupContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const DeckGroupTitle = styled.h3`
  margin-bottom: 0.5rem;
  color: #5e4b8a;
  text-align: center;
`;

const DeckGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 10px;
  justify-items: center; /* 그리드 아이템 가운데 정렬 */
  margin-top: 10px;
`;

const DeckCard = styled.div`
  border: 1px solid #aaa;
  padding: 5px;
  text-align: center;
  cursor: pointer;
  opacity: ${(props) => (props.isSelected ? "0.5" : "1")};
  border-radius: 8px;
  background-color: #fff;
  transition: background-color 0.3s;
  &:hover {
    background-color: #eee;
  }
`;

const DeckCardImage = styled.img`
  max-width: 100%;
  display: block;
  margin: 0 auto 5px auto;
  border-radius: 5px;
`;

const ResultContainer = styled.div`
  border-top: 1px solid #ddd;
  padding-top: 20px;
  margin-top: 20px;
`;

const ResultText = styled.div`
  white-space: pre-wrap;
  background: rgba(255, 255, 255, 0.7);
  padding: 10px;
  min-height: 80px;
  border-radius: 8px;
  text-align: left; /* 결과 내용은 왼쪽 정렬이 좀 더 읽기 편할 수 있음 */
  margin: 0 auto;
  max-width: 600px;
`;

const CopyButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #6e57c3;
  color: #fff;
  transition: background-color 0.3s;
  &:hover {
    background-color: #5a47a0;
  }
`;

const CopiedMessage = styled.div`
  color: green;
  font-size: 0.9rem;
  margin-top: 5px;
`;

// ======= 스프레드 정보 =======
const spreads = {
  oneCard: {
    name: "1장 (원 카드 스프레드)",
    positions: ["빠르게 방향성 확인(1장)"],
  },
  threeCards: {
    name: "3장 (과거-현재-미래)",
    positions: ["과거 (관계의 시작)", "현재 (현재 상태)", "미래 (앞으로의 방향)"],
  },
  fiveCards: {
    name: "5장 (상대방 중심 해석)",
    positions: [
      "그 사람의 현재 상태",
      "그 사람의 나에 대한 감정",
      "그 사람이 보이는 행동",
      "내게 원하는 것",
      "앞으로의 방향",
    ],
  },
  sixCards: {
    name: "6장 (연애/인간관계 스프레드)",
    positions: [
      "나의 마음",
      "상대의 마음",
      "관계의 현재 상태",
      "상대방이 나에게 바라는 점",
      "내가 상대방에게 바라는 점",
      "관계의 최종 방향",
    ],
  },
};

// ======= 카드 데이터 (메이저 + 마이너 78장) =======
const deckData = [
  // 메이저 아르카나(예시)
  { name: "The Fool", image: "/tarot/1.png" },
  { name: "The Magician", image: "/tarot/2.png" },
  { name: "The High Priestess", image: "/tarot/3.png" },
  { name: "The Empress", image: "/tarot/4.png" },
  { name: "The Emperor", image: "/tarot/5.png" },
  { name: "The Hierophant", image: "/tarot/6.png" },
  { name: "The Lovers", image: "/tarot/7.png" },
  { name: "The Chariot", image: "/tarot/8.png" },
  { name: "Strength", image: "/tarot/9.png" },
  { name: "The Hermit", image: "/tarot/10.png" },
  { name: "Wheel of Fortune", image: "/tarot/11.png" },
  { name: "Justice", image: "/tarot/12.png" },
  { name: "The Hanged Man", image: "/tarot/13.png" },
  { name: "Death", image: "/tarot/14.png" },
  { name: "Temperance", image: "/tarot/15.png" },
  { name: "The Devil", image: "/tarot/16.png" },
  { name: "The Tower", image: "/tarot/17.png" },
  { name: "The Star", image: "/tarot/18.png" },
  { name: "The Moon", image: "/tarot/19.png" },
  { name: "The Sun", image: "/tarot/20.png" },
  { name: "Judgement", image: "/tarot/21.png" },
  { name: "The World", image: "/tarot/22.png" },
  // 마이너 아르카나
  ...generateMinorArcana("Wands", "막대기"),
  ...generateMinorArcana("Cups", "성배"),
  ...generateMinorArcana("Swords", "검"),
  ...generateMinorArcana("Pentacles", "동전"),
];

// 마이너 아르카나 자동 생성 함수
function generateMinorArcana(suit, suitName) {
  const numbers = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Page", "Knight", "Queen", "King"];
  return numbers.map((num, index) => ({
    name: `${num} of ${suit}`,
    image: `/tarot/${suit}_${index + 1}.png`,
    suit: suitName
  }));
}


function App() {
  // 선택된 스프레드 키
  const [selectedSpreadKey, setSelectedSpreadKey] = useState("oneCard");
  // 질문
  const [question, setQuestion] = useState("");
  // 현재 스프레드 자리: [{ label: "", card: null }, ...]
  const [positions, setPositions] = useState([]);
  // 결과 표시 여부
  const [showResult, setShowResult] = useState(false);
  // 복사 성공 메시지
  const [copied, setCopied] = useState(false);

  // 스프레드 세팅
  const handleSetSpread = () => {
    const spreadInfo = spreads[selectedSpreadKey];
    // spreadInfo.positions를 기반으로, label 편집 가능하도록
    const newPositions = spreadInfo.positions.map(posLabel => ({
      label: posLabel, // 기본값
      card: null,
    }));
    setPositions(newPositions);
    setShowResult(false);
    setCopied(false);
  };

  // === 카드 선택 / 해제 ===
  const handleCardClick = (card) => {
    // 이미 선택됐는지 확인
    const foundIndex = positions.findIndex(
        (pos) => pos.card && pos.card.name === card.name
    );
    if (foundIndex >= 0) {
      // 이미 선택된 카드 → 해당 자리 해제
      const updatedPositions = [...positions];
      updatedPositions[foundIndex].card = null;
      setPositions(updatedPositions);
    } else {
      // 아직 선택되지 않은 카드 → 첫 번째 빈 자리 찾기
      const emptyPosIndex = positions.findIndex((pos) => pos.card === null);
      if (emptyPosIndex >= 0) {
        const updatedPositions = [...positions];
        updatedPositions[emptyPosIndex].card = card;
        setPositions(updatedPositions);
      } else {
        alert("이미 모든 자리가 카드로 채워졌습니다!");
      }
    }
    setShowResult(false);
    setCopied(false);
  };

  // === 자리 클릭 시 자리 비우기(이미 선택된 카드 해제) ===
  const handlePositionClick = (index) => {
    if (positions[index].card) {
      const updatedPositions = [...positions];
      updatedPositions[index].card = null;
      setPositions(updatedPositions);
      setShowResult(false);
      setCopied(false);
    }
  };

  // === 자리 이름(레이블) 수정 ===
  const handlePositionLabelChange = (index, newLabel) => {
    const updatedPositions = [...positions];
    updatedPositions[index].label = newLabel;
    setPositions(updatedPositions);
  };

  // === 완료 버튼 ===
  const handleComplete = () => {
    setShowResult(true);
    setCopied(false);
  };

  // === 결과 텍스트 ===
  const getResultText = () => {
    const userQuestion = question.trim() || "(질문이 입력되지 않음)";
    let resultStr = `질문: ${userQuestion}\n\n`;
    positions.forEach((pos, i) => {
      const cardName = pos.card ? pos.card.name : "(카드가 선택되지 않음)";
      resultStr += `${i + 1}. ${pos.label} - ${cardName}\n`;
    });
    return resultStr;
  };

  // === 텍스트 복사 ===
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getResultText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("복사에 실패했습니다: " + err);
    }
  };

  // === 자리 렌더링 (사용자가 label도 편집 가능) ===
  const renderPositions = () => {
    if (positions.length === 0) return null;
    return (
        <SpreadPositionsContainer>
          <SubTitle>뽑을 자리</SubTitle>
          <PositionList>
            {positions.map((pos, idx) => (
                <PositionCard
                    key={idx}
                    onClick={() => handlePositionClick(idx)}
                    title="클릭하면 이 자리에 있는 카드가 제거됩니다"
                >
                  {/* 자리 이름을 입력창으로 변경해 사용자가 수정 가능하게 함 */}
                  <PositionLabelInput
                      type="text"
                      value={pos.label}
                      onClick={(e) => e.stopPropagation()} // 부모의 onClick이 일어나지 않도록
                      onChange={(e) => handlePositionLabelChange(idx, e.target.value)}
                  />
                  {pos.card && (
                      <PositionImage src={pos.card.image} alt={pos.card.name} />
                  )}
                </PositionCard>
            ))}
          </PositionList>
        </SpreadPositionsContainer>
    );
  };

  // === 카드 덱을 suit별로 그룹화해서 렌더링 ===
  const renderDeck = () => {
    if (positions.length === 0) return null;

    // 메이저 아르카나
    const majorArcana = deckData.filter(card => !card.suit);
    // 막대기(Wands)
    const wands = deckData.filter(card => card.suit === "막대기");
    // 성배(Cups)
    const cups = deckData.filter(card => card.suit === "성배");
    // 검(Swords)
    const swords = deckData.filter(card => card.suit === "검");
    // 동전(Pentacles)
    const pentacles = deckData.filter(card => card.suit === "동전");

    // 그룹 렌더링 함수
    const renderDeckGroup = (title, cards) => {
      return (
          <DeckGroupContainer>
            <DeckGroupTitle>{title}</DeckGroupTitle>
            <DeckGrid>
              {cards.map((card) => {
                const isSelected = positions.some(
                    (pos) => pos.card && pos.card.name === card.name
                );
                return (
                    <DeckCard
                        key={card.name}
                        onClick={() => handleCardClick(card)}
                        isSelected={isSelected}
                    >
                      <DeckCardImage src={card.image} alt={card.name} />
                      <div>{card.name}</div>
                    </DeckCard>
                );
              })}
            </DeckGrid>
          </DeckGroupContainer>
      );
    };

    return (
        <DeckSection>
          <SubTitle>카드 더미 (클릭하여 선택/해제)</SubTitle>
          {renderDeckGroup("메이저 아르카나", majorArcana)}
          {renderDeckGroup("막대기 (Wands)", wands)}
          {renderDeckGroup("성배 (Cups)", cups)}
          {renderDeckGroup("검 (Swords)", swords)}
          {renderDeckGroup("동전 (Pentacles)", pentacles)}
          <Button onClick={handleComplete}>완료</Button>
        </DeckSection>
    );
  };

  // === 결과 렌더링 ===
  const renderResult = () => {
    if (!showResult) return null;
    return (
        <ResultContainer>
          <SubTitle>결과</SubTitle>
          <ResultText>{getResultText()}</ResultText>
          <CopyButton onClick={handleCopy}>결과 텍스트 복사</CopyButton>
          {copied && <CopiedMessage>복사되었습니다!</CopiedMessage>}
        </ResultContainer>
    );
  };

  return (
      <Background>
        <Container>
          <Title>타로 카드 뽑기 데모</Title>

          <SpreadSetup>
            <Label>
              스프레드 선택:
              <Select
                  value={selectedSpreadKey}
                  onChange={(e) => setSelectedSpreadKey(e.target.value)}
              >
                <option value="oneCard">1장 (원 카드 스프레드)</option>
                <option value="threeCards">3장 (과거-현재-미래)</option>
                <option value="fiveCards">5장 (상대방 중심 해석)</option>
                <option value="sixCards">6장 (연애/인간관계)</option>
              </Select>
            </Label>
            <br />
            <Label>
              질문(주제):
              <TextInput
                  placeholder="자유롭게 질문을 입력해주세요."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
              />
            </Label>
            <br />
            <Button onClick={handleSetSpread}>스프레드 세팅</Button>
          </SpreadSetup>

          {renderPositions()}
          {renderDeck()}
          {renderResult()}
        </Container>
      </Background>
  );
}

export default App;