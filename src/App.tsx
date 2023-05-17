import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Image, Modal, Row, Stack} from "react-bootstrap";

const KEY_ERDOGAN = "erdogan"
const KEY_KILICDAROGLU = "kilicdaroglu"

const CandidateCard: React.FC<{
    name: string,
    voteCount: number,
    image: string,
    onIncreaseVoteCount: () => void,
    onDecreaseVoteCount: () => void
}> = ({name, voteCount, image, onIncreaseVoteCount, onDecreaseVoteCount}) => {
    return (
        <Stack gap={2} className="col-md-5">
            <h6 className="text-center">{name}</h6>
            <Image src={image} className="col-md-2 align-self-center"/>
            <h1 className="text-center">{voteCount}</h1>
            <Button variant="outline-primary" onClick={onIncreaseVoteCount} size="lg">+</Button>
            <Button variant="outline-secondary" onClick={onDecreaseVoteCount} size="lg">-</Button>
        </Stack>
    );
}

function increase(value: number, key: string, setter: React.Dispatch<React.SetStateAction<number>>) {
    const newValue = value + 1
    localStorage.setItem(key, JSON.stringify(newValue))
    setter(newValue)
}

function decrease(value: number, key: string, setter: React.Dispatch<React.SetStateAction<number>>) {
    if (value > 0) {
        const newValue = value - 1
        localStorage.setItem(key, JSON.stringify(newValue))
        setter(newValue)
    }
}

function App() {
    const [erdoganCountState, setErdoganCountState] = useState(0);
    const [kilicdarogluCountState, setKilicdarogluCountState] = useState(0);
    const [resetConfirmationVisible, setResetConfirmationVisible] = useState(false)

    useEffect(() => {
        const erdoganCount = localStorage.getItem(KEY_ERDOGAN)
        if (erdoganCount != null) {
            setErdoganCountState(JSON.parse(erdoganCount))
        }
    })

    useEffect(() => {
        const kilicdarogluCount = localStorage.getItem(KEY_KILICDAROGLU)
        if (kilicdarogluCount != null) {
            setKilicdarogluCountState(JSON.parse(kilicdarogluCount))
        }
    })

    const resetCounts = () => {
        localStorage.setItem(KEY_ERDOGAN, JSON.stringify(0));
        localStorage.setItem(KEY_KILICDAROGLU, JSON.stringify(0));
        setErdoganCountState(0)
        setKilicdarogluCountState(0)
    }
    const showResetConfirmation = () => setResetConfirmationVisible(true)
    const hideResetConfirmation = () => setResetConfirmationVisible(false)
    return (
        <Container>
            <Stack direction="vertical" gap={2}>
                <h3>Çetele</h3>
                <Stack direction="horizontal" gap={3}>
                    <CandidateCard name="Recep Tayyip Erdoğan"
                                   voteCount={erdoganCountState}
                                   image="erdogan_pusula.jpg"
                                   onIncreaseVoteCount={() => increase(erdoganCountState, KEY_ERDOGAN, setErdoganCountState)}
                                   onDecreaseVoteCount={() => decrease(erdoganCountState, KEY_ERDOGAN, setErdoganCountState)}
                    />
                    <CandidateCard name="Kemal Kılıçdaroğlu"
                                   voteCount={kilicdarogluCountState}
                                   image="kilicdaroglu_pusula.jpg"
                                   onIncreaseVoteCount={() => increase(kilicdarogluCountState, KEY_KILICDAROGLU, setKilicdarogluCountState)}
                                   onDecreaseVoteCount={() => decrease(kilicdarogluCountState, KEY_KILICDAROGLU, setKilicdarogluCountState)}
                    />
                </Stack>
                <Container>
                    <Row>
                        <Col>
                            <h3 className="text-start">Toplam</h3>
                        </Col>
                        <Col>
                            <h3 className="text-end">{erdoganCountState + kilicdarogluCountState}</h3>
                        </Col>
                    </Row>
                </Container>
                <Button variant="danger" onClick={showResetConfirmation}>Sıfırla</Button>
            </Stack>

            <Modal show={resetConfirmationVisible} onHide={hideResetConfirmation}>
                <Modal.Header>
                    Sıfırla
                </Modal.Header>
                <Modal.Body>
                    Oy sayımlarını sıfırlamak istediğinden emin misin?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideResetConfirmation}>Geri dön</Button>
                    <Button variant="danger" onClick={() => {
                        resetCounts()
                        hideResetConfirmation()
                    }}>Sıfırla</Button>
                </Modal.Footer>
            </Modal>

            <div className="position-absolute top-100 start-50 translate-middle">
                2023 <a href="https://www.linkedin.com/in/yagizsenal">Yağız Şenal</a>
            </div>
        </Container>
    );
}

export default App;
