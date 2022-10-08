import React, { useState } from 'react';
import InputMask from "react-input-mask";
import { Inertia } from "@inertiajs/inertia";

import Nav from './Nav'
function Home(props) {
  const [valuesCreate, setValuesCreate] = useState({title:"" ,text:""})
  const [valuesEdit, setValuesEdit] = useState({title:"" ,text:""})

    function handleSubmitTodo(e,set,values,url){
        e.preventDefault()
        try {
          url==='/'? values.title.length>0 && values.text.length>0 ? Inertia.post(url,values): inputIsNull('form')   :Inertia.put(url,values)
        } catch (error) {
          console.log('error')
        }
        if(values.title.length>0 && values.text.length>0) {set({title:"" ,text:""})}
    }

    function inputIsNull(inputName){
      let input = document.getElementsByClassName('form-control')
      if(valuesCreate.title.length === 0 && inputName=='title' || valuesCreate.title.length === 0 && inputName=='form' ){ 
        input[0].classList.add('border-danger')
      }
      else if(valuesCreate.title.length > 0 && inputName=='title' || valuesCreate.title.length > 0 && inputName=='form' && input[0].classList.contains('border-danger') ){ 
        input[0].classList.remove('border-danger') 
      }
      if(valuesCreate.text.length === 0 && inputName =='text' || valuesCreate.text.length === 0 && inputName=='form') { 
        input[1].classList.add('border-danger')
      }
      else if(valuesCreate.text.length > 0 && inputName=='text' || valuesCreate.text.length > 0 && inputName=='form' && input[1].classList.contains('border-danger') ){ 
        input[1].classList.remove('border-danger') 
      }
    }

    function handleChange(e,set,values){
      const key = e.target.id
      const value = e.target.value
      set(
        values=>({
          ...values,
          [key]:value
        })
      )
    }

    function handleDelete(e,id){
      e.preventDefault()
      Inertia.post('/delete/'+id, {_method:"DELETE"})
    }

    return (
        <div className="page">
                <Nav></Nav>
                <div className="container">
        <div className="row">
            <div className="col-lg-6">

                <form  onSubmit={(e)=>handleSubmitTodo(e,setValuesCreate,valuesCreate,'/')} className="form-group">
                    {/* @csrf */}
                    <div className="form-group">
                        <label > Titulo </label>
                        <InputMask mask={"aaaaaaaaaaaaaaa"}  
                        maskChar=" " id="title" 
                        name="title" value={valuesCreate.title} 
                        onChange={(e)=>handleChange(e,setValuesCreate,valuesCreate)} type="text" 
                        className="form-control" onFocus={(e)=>inputIsNull('title')}  onBlur={(e)=>inputIsNull('title') } /> 
                       <br />
                        <label > Descripcion </label>
                        <InputMask mask={"aaaaaaaaaaaaaaa"}  maskChar=" " 
                        id="text" name="text" value={valuesCreate.text}
                        onChange={(e)=>handleChange(e,setValuesCreate,valuesCreate)} type="text" 
                        className="form-control" onFocus={(e)=>inputIsNull('text')} onBlur={(e)=>inputIsNull('text') } />
                    </div>
                    <br />
                    <button className="btn btn-outline-success float-right" >Enviar</button>
                </form>

            </div>
            <div className="col-lg-6">
                <table className="table">
                    <thead>
                      <tr>
                          <th>Title</th>
                          <th>Text</th>

                          <th>Delete</th>
                          <th>Edit</th>
                      </tr>
                    </thead>
                  <tbody> 
                    {props.todos.map( ({id,text,title }) => 
                    <tr key={id}>
                      <td>{title}</td>
                      <td>{text}</td>
                        <td>
                            <button type="submit" className="btn btn-sm btn-outline-danger" onClick={(e)=>handleDelete(e,id)}>
                              Delete
                            </button>
                        </td>
                        <td>
                          {/* <!-- Button trigger modal --> */}
                          <button type="button" className="btn btn-sm btn-outline-warning" data-toggle="modal" data-target={`#exampleModal${id}`}>
                            Edit
                          </button>
                          {/* <!-- Modal --> */}
                          <div className="modal fade" id={`exampleModal${id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <form onSubmit={(e)=>handleSubmitTodo(e,setValuesEdit,valuesEdit,`/edit/${id}`)}>
                                    <div className="form-group">
                                      <label > Titulo </label>
                                      <InputMask mask={"aaaaaaaaaaaaaaa"}  maskChar=" " id="title" name="title" value={valuesEdit.title} onChange={(e)=>handleChange(e,setValuesEdit,valuesEdit)} type="text" className="form-control"/>
                                    <br />
                                      <label > Descripcion </label>
                                      <InputMask mask={"aaaaaaaaaaaaaaa"}  maskChar=" " id="text" name="text" value={valuesEdit.text} onChange={(e)=>handleChange(e,setValuesEdit,valuesEdit)} type="text" className="form-control"/>
                                  </div>
                                  <br />
                                    <button type="submit" className="btn btn-sm btn-outline-success" >
                                      Update
                                    </button>
                                  </form>
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                    </tr>
                  )}
                  </tbody>
                </table>
            </div>
        </div>
      </div>




        </div>
    );
}

export default Home;