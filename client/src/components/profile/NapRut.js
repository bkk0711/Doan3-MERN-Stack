import UserInfo from "./UserInfo"
import {Container, 
    Spinner, 
    Card, 
    Badge, 
    Row, 
    Col, 
    ListGroup, 
    InputGroup, 
    FormControl,
    Button,
    Alert,
    Form,
    Modal} from 'react-bootstrap'
import { AuthContext } from "../shop/auth/AuthContext"
import { useContext, useEffect, useState } from 'react'
import ToastMessage from "../shop/layout/ToastMessage"
import AddBank from "./AddBank"
import moment from 'moment'
import DataTable from 'react-data-table-component'
const NapRut = () => {
    const {
        authState: {user},
        UserState: {Fulllogs, LogLoading},
        withdraw, 
        loadLogs, 
        DeleteBankUser,
        setModelAddBank,
        loadUser
	} = useContext(AuthContext)
    useEffect(() => loadLogs(), [])
    const [show, setShow] = useState({_status: false, message: null, title: null, _style: null});
    const [smShow, setSmShow] = useState({bankId: '',  show: false});

    const copy = () =>{
            var copyText = document.getElementById("copy");

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        navigator.clipboard.writeText(copyText.value);
  
        setShow({_status: true, message: "Copy thành công nội dung nạp", title: "Thành công", _style: ""}) //success
        setTimeout(() => setShow(null), 3000)
    }
   

    const [withdrawForm, setwithdrawForm] = useState({
        action: 'withdraw',
        value: '',
        bankId: ''
    })
    const {action, value, bankId} = withdrawForm

    const OnClickDelete = (id) =>{
        
        setSmShow({bankId: id,  show: true})
    }
    const XoaBank = async (id) => {
        await DeleteBankUser(id)
        await loadUser()
        setSmShow({show: false})
        setShow({_status: true, message: "Bạn đã xoá thành công ngân hàng", title: "Thành công", _style: ""}) //success
        setTimeout(() => setShow(null), 2500)
    }

    const OnchangeBank = (event) =>{
        setwithdrawForm({
            ...withdrawForm, [event.target.name]: event.target.value
            }) 
            console.log(withdrawForm)
    }

    const SubmitWithDraw = async (event) => {
        event.preventDefault()
        try{
            const res = await withdraw(withdrawForm)
            if(res.success){
                await loadLogs()
                setShow({_status: true, message: "Rút tiền thành công, vui lòng đợi duyệt", title: "Thành công", _style: ""}) //success
                setTimeout(() => setShow(null), 2500)
            setwithdrawForm({
            ...withdrawForm, 
            value: ''
            })
         
            }else{
                setShow({_status: true, message: res.message, title: "Thất bại", _style: ""}) //success
                setTimeout(() => setShow(null), 2500)
            }
        }catch (error) {
            console.log(error)
        }
    }

    console.log(Fulllogs)
    let bankHTML
    if(user.banks.length == 0){
        bankHTML = (
            <Col md="12"> <Alert variant="danger">
           Bạn không thể rút tiền. Vui lòng thêm ngân hàng để thực hiện rút tiền.
            </Alert>  
            </Col>
        )
    }else{
        bankHTML = (
            user.banks.map(row => (
            
                <Col md="4" key={row._id}>
                    <small>
                    <Badge pill bg="danger"
                    style={{float: 'right', cursor: 'pointer'}} onClick={OnClickDelete.bind(this, row._id)}>x</Badge></small>
                            <Form.Check 
                            type="radio"
                            id={`bankId-${row._id}`}
                            name="bankId" 
                            value={row._id}
                            onChange={OnchangeBank}
                            label={(<Card>
                                <Card.Body>
                                    
                                    {/* <center> */}
                                        Ngân hàng: <b>{row.bank}</b>
                                        <br/>
                                    Chủ tài khoản: <b>{row.name_bank}</b>
                                        <br/>
                                        Số tài khoản: <b>{row.stk_bank}</b>
                                        <br/>
                                        Chi nhánh:  <b>{row.chi_nhanh ? row.chi_nhanh : '' }</b>
                                    {/* </center> */}
                                    </Card.Body>
                                </Card>)}
                        />
                </Col> 
            
            ))
           
        )

    }
    let dataWitdraw
    let logHTML
    if(LogLoading){
        logHTML = (<>Loading</>)
    }else{
        dataWitdraw = Fulllogs.logs.filter(row=> row._action == "withdraw")
        const columns = [

            {
                name: 'Số tiền',
                selector: row => (<>{(1*row._value).toLocaleString()} VNĐ</>)  ,
                sortable: true,
            },
            {
                name: 'Ngày rút',
                selector: row => (<>
                    <Badge bg="danger">{moment(row.createdAt).format("DD/MM/YYYY ")}</Badge>
                   </>)  ,
               
            },
            {
                name: 'Ngân hàng',
                selector:  row => (<>
                {row._payload.bank} | {row._payload.name_bank} | {row._payload.stk_bank}
                </>) , //row => row.category ? row.category.cname :
                sortable: true,
            }
           
        ]
        logHTML = (
            <>
            <DataTable title="Lịch sử rút tiền" keyField='_id' columns={columns}  data={dataWitdraw} pagination />
                           
            </>
        )
    }
       
   

    return (
        <Container>
            <AddBank />
            <Modal
        size="sm"
        show={smShow.show}
        onHide={() => setSmShow({show: false})}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
           Xác nhận xoá
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xoá không ?</Modal.Body>
        <Modal.Footer>
        <Button className='btn btn-sm btn-success' onClick={() => XoaBank(smShow.bankId)}>Đồng ý</Button>
        <Button className='btn btn-sm btn-danger' onClick={() => setSmShow({show: false})}>Huỷ bỏ</Button>
      </Modal.Footer>
      </Modal>
             <ToastMessage show={show} />
            <Row>
                <Col md="3">
                <UserInfo localtion="4" />
                </Col>
                <Col md="9">
              
                   

                        
                        <h3 className="title-panel">Nạp tiền</h3>

                        <Alert variant="warning">
                Bạn vui lòng chuyển khoản chính xác nội dung chuyển khoản bên dưới hệ thống sẽ tự động cộng tiền cho bạn sau 1 phút sau khi nhận được tiền. 
               Nếu chuyển khác ngân hàng sẽ mất thời gian lâu hơn, tùy thời gian xử lý của mỗi ngân hàng.

               <br/>Nếu sau 10 phút từ khi tiền trong tài khoản của bạn bị trừ mà vẫn chưa được cộng tiền vui lòng gọi <b> 0869.202.851 </b> để liên hệ hỗ trợ.
               </Alert>  
             
                        <Alert variant="danger">
                        Chú ý:<br/>
- Nạp sai cú pháp hoặc sai số tài khoản sẽ bị trừ 10% phí giao dịch, tối đa trừ 50.000 VNĐ. <br/>
Ví dụ nạp sai 100.000 trừ 10.000, 200.000 trừ 20.000, 500.000 trừ 50.000, 1 triệu trừ 50.000, 10 triệu trừ 50.000...
                        </Alert>  

                    <Row>
                        <Col md="4">
                        <Card>
                        <Card.Body>
                            {/* <center> */}
                                 Ngân hàng: <b>VietComBank</b>
                                <br/>
                               Chủ tài khoản: <b>Bui Khoi Khoi</b>
                                <br/>
                                Số tài khoản: <b>0601000525487</b>
                                <br/>
                                Chi nhánh:  <b>Đồng Tháp</b>
                            {/* </center> */}
                            </Card.Body>
                        </Card>
                        </Col>
                        <Col md="8">
                        <Card>
                        <Card.Body>
                            <br/>
                        <InputGroup className="mb-4 mt-2">
                                <FormControl
                                placeholder="Nội dung chuyển tiền"
                                defaultValue={"ithub "+ user.username}
                                aria-describedby="basic-addon2"
                                id="copy"
                                />
                                <Button variant="outline-success" onClick={copy} className="btn-noma" id="button-addon2">
                                <i className="fad fa-copy"></i> Copy
                                </Button>
                            </InputGroup>
                       
                        </Card.Body>
                        </Card>
                       

                        </Col>
                      
                      
                    </Row>
                    <br/>
                    <h3 className="title-panel">Rút tiền <span className="badge bg-danger" onClick={() => setModelAddBank({show: true})} style={{cursor: 'pointer', float: 'right', marginTop: '6px', fontSize: '16px'}}>Thêm ngân hàng</span></h3>
                    <Form onSubmit={SubmitWithDraw}>
                    <Row>
                      
                        {bankHTML}
                        
                        <Col md="12" className="mt-2">
                        <Card>
                        <Card.Body>
                           Bạn muốn rút bao nhiêu ? 
                        <InputGroup className="mb-4 mt-2">
                                <FormControl
                                type="number"
                                placeholder="Nhập số tiền"
                               value={value}
                               name="value"
                               onChange={OnchangeBank}
                                aria-describedby="basic-addon2"
                                id="copy"
                                />
                                <Button variant="outline-success" type="submit" className="btn-noma" id="button-addon2">
                                <i className="fad fa-file-import"></i> Rút
                                </Button>
                            </InputGroup>
                       
                        </Card.Body>
                        </Card>
                        </Col>
                      
                    </Row>
                    </Form>
                    <br/>
                    {/* <h3 className="title-panel">Lịch sử rút tiền</h3> */}
                   <Row>
                       <Col md="12">
                        <Card>
                            <Card.Body>
                               {logHTML}
                            </Card.Body>
                        </Card>
                       </Col>
                   </Row>
                   <br/>
                </Col>
               
            </Row>
           

        </Container>
    )
}

export default NapRut
