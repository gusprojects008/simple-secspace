import {useRouter} from 'next/router';
import {AnimatePresence, motion} from 'framer-motion';
import {ThemeProvider} from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import ToggleTheme from '../components/ThemeToggle';
import '../styles/globals.css';

export default function App({Component, pageProps}) {
  const router = useRouter();
  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        <motion.div
          key={router.asPath}
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -20}}
          transition={{duration: 0.3, ease: 'easeOut'}}
        >
          <Navbar/>
          <ToggleTheme/>
          <Component {...pageProps}/>
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
};
