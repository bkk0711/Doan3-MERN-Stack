import {
    Card, 
    Badge, 
    InputGroup, 
    FormControl,
    Button,
    Alert,
    Form,
    Modal} from 'react-bootstrap'
import { AuthContext } from "../shop/auth/AuthContext"
import { useContext, useEffect, useState } from 'react'
import ToastMessage from "../shop/layout/ToastMessage"

const AddBank = () => {

    const {
        authState: {user},
        ModelAddBank,
        setModelAddBank,
        AddBank,
        loadUser
	} = useContext(AuthContext)
    const [show, setShow] = useState({_status: false, message: null, title: null, _style: null});
    const [AddBankForm, setAddBankForm] = useState({
        bank: '',
        name_bank: '',
        stk_bank: '', 
        chi_nhanh : ''
    })
    const {bank, name_bank, stk_bank, chi_nhanh} = AddBankForm

    const OnchangeAdd = (event) =>{
        // console.log( { AddBankForm} );
        setAddBankForm({
            ...AddBankForm, [event.target.name]: event.target.value
            })
            
    }
    console.log( { AddBankForm} );
    const onSubmitAdd = async event =>{
        event.preventDefault()
        try {
            const res = await AddBank(AddBankForm)
            if(res.success){
                setModelAddBank({show: false})
                await loadUser()
                setShow({_status: true,message: res.message, title: "Thành công", _style: ""}) //success
        setTimeout(() => setShow(null), 3000)
        
        
            setAddBankForm({
            ...AddBankForm, 
            name_bank: '',
            stk_bank: '', 
            chi_nhanh : ''
            })
    
            }else{
                setShow({_status: true,message: res.message, title: "Thất bại", _style: ""}) //success
                setTimeout(() => setShow(null), 3000)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
         <ToastMessage show={show} />
        <Modal
        show={ModelAddBank.show}
        onHide={()=>setModelAddBank({show: false})}
      >
          <Form onSubmit={onSubmitAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm ngân hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
         <div className="form-group mb-3">
         <label htmlFor="exampleFormControlSelect1" className="form-label">Ngân hàng</label>
         <select id="nganhang" className="form-control" name="bank" onChange={OnchangeAdd}>
    <option value="">--- Chọn ngân hàng ---</option>                  
    <option value="">Chọn ngân hàng</option>
    <option value="MOMO">MOMO</option>
    <option value="VIETTEL PAY">VIETTEL PAY</option>
    <option value="ZALO PAY">ZALO PAY</option>
    <option value="AIRPAY">AIRPAY</option>
    <option value="VIETINBANK">VIETINBANK</option>
    <option value="VIETCOMBANK">VIETCOMBANK</option>
    <option value="AGRIBANK">AGRIBANK</option>
    <option value="TPBANK">TPBANK</option>
    <option value="HDB">HDB</option>
    <option value="VPBANK">VPBANK</option>
    <option value="MBBANK">MBBANK</option>
    <option value="OCEANBANK">OCEANBANK</option>
    <option value="BIDV">BIDV</option>
    <option value="SACOMBANK">SACOMBANK</option>
    <option value="ACB">ACB</option>
    <option value="ABBANK">ABBANK</option>
    <option value="NCB">NCB</option>
    <option value="IBK">IBK</option>
    <option value="CIMB">CIMB</option>
    <option value="EXIMBANK">EXIMBANK</option>
    <option value="SEABANK">SEABANK</option>
    <option value="SCB">SCB</option>
    <option value="DONGABANK">DONGABANK</option>
    <option value="SAIGONBANK">SAIGONBANK</option>
    <option value="PG BANK">PG BANK</option>
    <option value="PVCOMBANK">PVCOMBANK</option>
    <option value="KIENLONGBANK">KIENLONGBANK</option>
    <option value="VIETCAPITAL BANK">VIETCAPITAL BANK</option>
    <option value="OCB">OCB</option>
    <option value="MSB">MSB</option>
    <option value="SHB">SHB</option>
    <option value="VIETBANK">VIETBANK</option>
    <option value="VRB">VRB</option>
    <option value="NAMABANK">NAMABANK</option>
    <option value="SHBVN">SHBVN</option>
    <option value="VIB">VIB</option>
    <option value="TECHCOMBANK">TECHCOMBANK</option>
                                            </select>
                                            </div>
         <Form.Group className="mb-3" controlId="formBasicchutk">
            <Form.Label>Chủ tài khoản</Form.Label>
            <Form.Control type="text" placeholder="Chủ tải khoản" name="name_bank" value={name_bank} onChange={OnchangeAdd}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicstk" >
            <Form.Label>Số tài khoản</Form.Label>
            <Form.Control type="text" placeholder="Số tải khoản" name="stk_bank" value={stk_bank} onChange={OnchangeAdd}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicchinhanh" >
            <Form.Label>Chi nhánh</Form.Label>
            <Form.Control type="text" placeholder="Chi nhánh" name="chi_nhanh" value={chi_nhanh} onChange={OnchangeAdd}/>
        </Form.Group>

        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={()=>setModelAddBank({show: false})}>
            Huỷ
          </Button>
          <Button variant="success" type="submit">Thêm</Button>
        </Modal.Footer>
        </Form>
      </Modal>
        </>
    )
}

export default AddBank
