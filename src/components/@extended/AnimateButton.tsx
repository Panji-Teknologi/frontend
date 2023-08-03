import { ReactNode } from 'react';

// third-party
import { motion } from 'framer-motion';

interface AnimateButtonTypes {
  children: ReactNode,
  type: 'slide' | 'scale' | 'rotate'
};

// ==============================|| ANIMATION BUTTON ||============================== //

export default function AnimateButton({ children, type }: AnimateButtonTypes) {
  switch (type) {
    case 'rotate': // only available in paid version
    case 'slide': // only available in paid version
    case 'scale': // only available in paid version
    default:
      return (
        <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
          {children}
        </motion.div>
      );
  }
}


AnimateButton.defaultProps = {
  type: 'scale'
};
