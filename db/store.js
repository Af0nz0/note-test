// import fs module
const fs = require("fs");


//define class Store to handle reading, writing, retrieving notes, add and delete notes
class Store {

  //read data from db.json file
  async read() {
    try {
      //read the data from db.json and store it in data variable
      const data = await fs.promises.readFile("db/db.json", "utf8");

      //return content of file
      return data;

      //for any error that occurs, catch and throw the error
    } catch (error) {
      throw error;
    }
  }


  //write data from db.json file
  async write(data) {
    try {
      //write file using json.stringify data to db.json
      await fs.promises.writeFile("db/db.json", JSON.stringify(data));

      //for any error that occurs, catch and throw the error
    } catch (error) {

      throw error;
    }
  }


  //retrieve the notes from file
  async getNotes() {
    try {
      const notes = await this.read();
      let parsedNotes;
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (error) {
        parsedNotes = [];
      }
      return parsedNotes;
    } catch (error) {
      throw error;
    }
  }



  // function to add new note
  async addNote(note) {


    //destructure title and text from note object
    const { title, text } = note;

    //checker if title and text are null
    if (!title || !text) {

      //error message user receives
      throw new Error("Please enter note title and text");
    }
    // variable to create new note, uses Math.random() method to generate unique id
    const newNote = { title, text, id: Math.random() };

    try {
      //retrieve the existing note
      const notes = await this.getNotes();

      //creates new array updatedNotes, combining existing notes with new note
      const updatedNotes = [...notes, newNote];

      //write updatedNotes array on the file using .write()
      await this.write(updatedNotes);

      //return new created note
      return newNote;

      //for any error that occurs, catch and throw the error
    } catch (error) {

      throw error;
    }
  }


  // remove note by specific id
  async removeNote(id) {
    try {
      // read all notes from the `db.json` file
      const notes = await this.getNotes();

      //create variable filteredNotes to filter existing note based from specific id assigned to it for deletion
      const filteredNotes = notes.filter((note) => note.id !== parseFloat(id));

      //rewrite the notes to the `db.json` file
      await this.write(filteredNotes);

      //for any error that occurs, catch and throw the error
    } catch (error) {
      throw error;
    }
  }
}


//export class store to be used in other file
module.exports = new Store();
