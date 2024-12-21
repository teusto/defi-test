import Header from "@/components/Header";
import MainFrame from "@/components/MainFrame";
import styles from './page.module.scss'

const App = () => {
  return (
    <div style={{ backgroundColor: '#FDF7F4'}}>
      <section className={styles.sections}>
        <Header />
      </section>
      <section className={styles.sections}>
        <MainFrame />
      </section>
    </div>
  )
}

export default App;