import React from "react";
import { IndNoteContainer, NoteToolDiv, IndNoteText, IndNoteTitle, ToolBtn} from "../../Styles/IndividualNoteStyles";
import Modal from 'react-modal'
import {ModalDiv, ModalText, NoButton, NoButtonText,
  DeleteButtonText, DeleteButton} from '../../Styles/DeleteModalStyles'

class IndividualNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {},
      modalIsOpen: false,
    };
  }

componentDidMount() {
    const noteId = this.props.match.params.id
    this.setState({
      note: this.props.notes.find(note => note._id == noteId)
      })
}

openModal = () => {
  this.setState({modalIsOpen: true})
}

closeModal = () => {
  this.setState({modalIsOpen: false})
}



  render() {
      const {title, textBody, tags} = this.state.note;
    return (
    
        <IndNoteContainer> 
            <NoteToolDiv>
                <ToolBtn onClick={ev => {this.props.toggleEditNoteForm(ev, this.state.note); this.props.history.push('/form')}}>edit</ToolBtn> <ToolBtn onClick={() => this.openModal()}>delete</ToolBtn>
            </NoteToolDiv>
            <IndNoteTitle>{title}</IndNoteTitle>
            <IndNoteText>{textBody}</IndNoteText>
            <Modal 
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            >
            <ModalText>Are you sure you want to delete?</ModalText>
            <ModalDiv>
            <DeleteButton onClick={ev => {this.props.deleteNote(ev, this.props.match.params.id); this.props.history.push('/home')}}><DeleteButtonText>Delete</DeleteButtonText></DeleteButton>
            <NoButton onClick={() => this.closeModal()}><NoButtonText>No</NoButtonText></NoButton>
            </ModalDiv>
            </Modal>

            <IndNoteText>{tags}</IndNoteText>
        </IndNoteContainer>
     
    );
  }
}

const customStyles = {
  overlay: {
    backgroundColor: "rgba(242, 241, 242, 0.75)"
  },
  content: {
    position: "absolute",
    top: "200px",
    left: "30%",
    right: "30%",
    bottom: "40%",
    border: "1px solid #b7b7b7",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "none",
    outline: "none",
    padding: "20px"

  }
}



export default IndividualNote;
