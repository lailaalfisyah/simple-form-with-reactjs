import React from 'react';

function Form() {
  const [username, setUsername] = React.useState([]);
  const [fullName, setFullName] = React.useState([]);
  const [email, setEmail] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [edit, setEdit] = React.useState({});
  
  function generateId() {
    return Date.now();
  }

  function saveDataHandler(event) {
    event.preventDefault();

    if(edit.id) {
      const updateData = {
        id: edit.id,
        fullName,
        username,
        email
      };

      const editDataIndex = data.findIndex(function (data) {
        return edit.id === data.id;
      });

      const updateAllData = [...data];
      updateAllData[editDataIndex] = updateData;
      // console.log(updateAllData);
      setData(updateAllData);
      return;
    }

    setData([...data, {
        id: generateId(),
        fullName,
        username,
        email
      }
    ]);
    
    setFullName('');
    setUsername('');
    setEmail('');
  }

  function editDataHandler(data) {
    setFullName(data.fullName);
    setUsername(data.username);
    setEmail(data.email);
    setEdit(data);
  }

  return (
    <>
      <h1>Players Data Form</h1>
      <form onSubmit={saveDataHandler}>
        <input
          type="text" 
          placeholder="Full Name"
          value={fullName}
          onChange={function (event) {
            setFullName(event.target.value);
          }}
           /><br />
        <input
          type="text" 
          placeholder="Username"
          value={username}
          onChange={function (event) {
            setUsername(event.target.value);
          }}
           /><br />
        <input
          type="text" 
          placeholder="Email"
          value={email}
          onChange={function (event) {
            setEmail(event.target.value);
          }}
           /><br />
        <button type="submit">Submit</button>
      </form>
      <br /><br />
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
            {data.map(function (data) {
              return <tr>
                <td key={data.id}>{data.fullName}</td>
                <td key={data.id}>{data.username}</td>
                <td key={data.id}>{data.email}</td>
                <td><button onClick={editDataHandler.bind(this, data)}>Edit</button></td>
              </tr>;
            })}
        </tbody>
      </table>
    </>
  );
}

export default Form;
