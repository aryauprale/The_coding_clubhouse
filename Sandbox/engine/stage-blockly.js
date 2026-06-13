/* stage-blockly.js */

import { StageCore } from "./stage-core.js";

export function compileEvents(ws, prefix, SE_MOVE_OPTIONS, SE_SOUND_OPTIONS) {
  const map = {};
  const p = prefix || '';

  ws.getAllBlocks(false).forEach(block => {
    if (block.type !== p + 'when_key') return;

    const key = block.getFieldValue('KEY');
    const actions = [];

    let b = block.getInputTargetBlock('DO');

    while (b) {
      const t = b.type;

      if (t === p + 'move') {
        actions.push({ type: 'move', value: b.getFieldValue('ACTION') });
      }

      if (t === p + 'say') {
        actions.push({ type: 'say', value: b.getFieldValue('MSG') });
      }

      if (t === p + 'costume') {
        actions.push({ type: 'costume', value: b.getFieldValue('IDX') });
      }

      if (t === p + 'background') {
        actions.push({ type: 'background', value: b.getFieldValue('IDX') });
      }

      if (t === p + 'sound') {
        actions.push({ type: 'sound', value: b.getFieldValue('SOUND') });
      }

      b = b.getNextBlock();
    }

    map[key] = actions;
  });

  StageCore.eventMap = map;
}

export function compileRules(ws, blockType) {
  const rules = {};

  ws.getTopBlocks(true).forEach(block => {
    let b = block;

    while (b) {
      if (b.type === blockType) {
        rules[b.getFieldValue('COLOR')] =
          b.getFieldValue('REACTION');
      }
      b = b.getNextBlock();
    }
  });

  return rules;
}
