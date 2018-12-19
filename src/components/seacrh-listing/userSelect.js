import React from "react";
import { WithContext as ReactTags } from "react-tag-input";
import "./reactTags.css";

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class UserAutosearch extends React.Component {
  constructor(props) {
    super(props);
    //console.log('UserAutosearch', this.props);
    this.state = {
      tags: [],
      suggestions: []
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  componentWillMount() {
    let suggestions = [];
    this.props.userList.forEach((user, userIndex) => {
      suggestions.push({
        id: user._id,
        text: (user.firstName + " " + user.lastName).trim()
      });
    });
    this.setState({ suggestions: suggestions });
  }

  handleDelete(i) {
    const { tags } = this.state;
    this.setState(
      {
        tags: tags.filter((tag, index) => index !== i)
      },
      () => {
        this.props.onUserChange(this.state.tags);
      }
    );
  }

  handleAddition(tag) {
    this.setState(
      state => ({ tags: [...state.tags, tag] }),
      () => {
        this.props.onUserChange(this.state.tags);
      }
    );
  }

  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
  }

  render() {
    const { tags, suggestions } = this.state;
    return (
      <div>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag}
          delimiters={delimiters}
        />
      </div>
    );
  }
}
export default UserAutosearch;
