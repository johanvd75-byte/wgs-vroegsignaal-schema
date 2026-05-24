# @fynqo/wgs-vroegsignaal-schema

JSON Schema voor vroegsignaal-bestanden onder de **Wet gemeentelijke
schuldhulpverlening (Wgs)** in Nederland.

Het schema beschrijft het inwonersignaal dat een signaalpartij
(woningcorporatie, energieleverancier, drinkwaterbedrijf, zorgverzekeraar)
aan een gemeente levert wanneer een inwoner een betalingsachterstand heeft.
Format is gebaseerd op het [NVVK Convenant Vroegsignalering](https://www.nvvk.nl/).

> Dit pakket bevat **geen** persoonsgegevens. Alleen de structuur (schema)
> en synthetische voorbeelden.

## Install

```bash
npm install @fynqo/wgs-vroegsignaal-schema ajv ajv-formats
```

## Usage

```js
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const { schema, buildValidator } = require('@fynqo/wgs-vroegsignaal-schema');

const validate = buildValidator(Ajv, addFormats);

const ok = validate(mijnSignaal);
if (!ok) console.error(validate.errors);
```

Het schema is ook direct bruikbaar als JSON-Schema-2020-12 document:

```js
const schema = require('@fynqo/wgs-vroegsignaal-schema/schemas/inwonersignaal.schema.json');
```

## Velden (samenvatting)

| Veld | Type | Verplicht | Toelichting |
|---|---|---|---|
| `signaalId` | string | ✅ | Unieke ID binnen signaalpartij |
| `signaalDatum` | date | ✅ | ISO 8601 |
| `signaalPartij` | object | ✅ | naam, type, optioneel kvk |
| `bron` | enum | ✅ | `primair` of `secundair` |
| `inwoner` | object | ✅ | achternaam verplicht, BSN optioneel |
| `adres` | object | ✅ | postcode + huisnummer + woonplaats |
| `vordering` | object | ✅ | bedrag, valuta, vorderingType, fase |
| `context` | object | – | huishoudtype, kinderen, opmerking |
| `toestemmingGedeeld` | boolean | – | True = verbrede deling toegestaan |

Voorbeelden staan in [`fixtures/`](./fixtures/).

## AVG / dataminimalisatie

- BSN is **optioneel**. Alleen aanleveren als de Wgs-grondslag (art. 3) van
  toepassing is.
- `toestemmingGedeeld: false` is het wettelijke minimum. Pas op `true` zetten
  na expliciete toestemming van de inwoner.
- Velden in `context.opmerking` mogen geen bijzondere persoonsgegevens
  bevatten (gezondheid, religie, etc.).

## Achtergrond

Wil je weten hoe vroegsignalering werkt en welke partijen verplicht
aanleveren? Zie de uitleg op
[fynqo.app/feiten/wat-is-wgs-vroegsignalering](https://fynqo.app/feiten/wat-is-wgs-vroegsignalering).

## License

MIT — zie [LICENSE](./LICENSE).

## About

Maintained by [Fynqo](https://fynqo.app) — platform voor schuldhulp,
budgetcoaching en gemeentelijke vroegsignalering.

- Website: <https://fynqo.app>
- Contact: <info@fynqo.app>
