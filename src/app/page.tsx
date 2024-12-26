import Header from "@/components/Header";
import MainFrame from "@/components/MainFrame";
import styles from './page.module.scss'

const App = () => {
  return (
    <div style={{ backgroundColor: '#e0e1dd'}}>
      <section className={styles.sections}>
        <MainFrame />
      </section>
    </div>
  )
}

export default App;