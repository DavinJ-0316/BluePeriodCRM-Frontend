import { Suspense } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import Route from './routes';

const App = () => (
    <Suspense fallback={<LoadingSpinner />}>
        <Route />
    </Suspense>
);

export default App;
