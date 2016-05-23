// FIXME: This works by magic now, since it just assumes the engine adapter exists.
import EngineAdapter from './engine';

export default EngineAdapter.extend({
  engine: 'goals'
});
