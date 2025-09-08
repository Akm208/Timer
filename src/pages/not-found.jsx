

const NotFoundPage = () => {
    
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Not Found</h1>
      <p style={styles.message}>Sorry, the page you are looking for does not exist.</p>
      <a href="/" style={styles.link}>⬅Go back to Home</a>
    </div>
  )
}
const styles={
        container:{
            textAlign:'center',
            padding:'80px 20px',
            color:'#fff'
        },
        title:{
            fontSize:"71px",
            marginBottom:'20px'
        },
        message:{
            fontSize:'18px',
            marginBottom:'30px'
        },
        link:{
            textDecoration:'none',
            color:'#007bff',
            fontWeight:'bold'
        }
    }

export default NotFoundPage
