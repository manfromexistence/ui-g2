/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {DynamicScheme} from '../dynamiccolor/dynamic_scheme';
import {Variant} from '../dynamiccolor/variant';
import {Hct} from '../hct/hct';
import {TonalPalette} from '../palettes/tonal_palette';
import * as math from '../utils/math_utils';

/**
 * A playful theme - the source color's hue does not appear in the theme.
 */
export class SchemeFruitSalad extends DynamicScheme {
  private static readonly DEFAULT_SPEC_VERSION = '2021';
  private static readonly DEFAULT_PLATFORM = 'phone';

  constructor(sourceColorHct: Hct, isDark: boolean, contrastLevel: number) {
    super({
      sourceColorHct,
      variant: Variant.FRUIT_SALAD,
      contrastLevel,
      isDark,
      platform: SchemeFruitSalad.DEFAULT_PLATFORM,
      specVersion: SchemeFruitSalad.DEFAULT_SPEC_VERSION,
    });
  }
}
