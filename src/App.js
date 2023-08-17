import Layout from './Layout';
import img from './img/img.avif'
import './styles/home.css'

const App = () => {
  return(
    <Layout>
      <div>
        <div class="img" style={{ backgroundImage:`url(${img})` }}></div>
        <div class="center">
          <div class="title">IDEAMAGIX</div>
          <div class="btns">
            <button>Lecture Scheduling Module</button>
            <button>More</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default App;