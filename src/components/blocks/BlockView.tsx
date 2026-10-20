import { useState } from 'react'
import type { Block } from '../../data'
import Modal from '../Modal'

/** Screenshot that opens larger in a pop-up. Lazy-loaded so long case studies stay light. */
function ZoomImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" className="zoom-img" onClick={() => setOpen(true)} aria-label={`Enlarge image: ${alt}`}>
        <img src={src} alt={alt} loading="lazy" decoding="async" draggable={false} />
        <span className="zoom-img__hint" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M15 15l6 6M10 17a7 7 0 1 1 0-14 7 7 0 0 1 0 14zM10 7v6M7 10h6" /></svg>
        </span>
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title={caption ?? alt} size="xl">
        <img className="modal__img" src={src} alt={alt} />
      </Modal>
    </>
  )
}

export default function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'text':
      return (
        <div className="block block--text">
          {block.title && <h3>{block.title}</h3>}
          {block.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      )

    case 'list': {
      const List = block.ordered ? 'ol' : 'ul'
      return (
        <div className="block block--list">
          {block.title && <h3>{block.title}</h3>}
          <List className={block.ordered ? 'steps-list' : 'check-list'}>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </List>
        </div>
      )
    }

    case 'flow':
      return (
        <figure className="block block--flow">
          <h3>{block.title}</h3>
          {block.caption && <figcaption>{block.caption}</figcaption>}
          <div className="flow-lanes">
            {block.lanes.map((lane) => (
              <section
                key={lane.label}
                className={`flow-lane flow-lane--${lane.tone ?? 'accent'}`}
                aria-label={lane.label}
              >
                <h4>{lane.label}</h4>
                <ol>
                  {lane.steps.map((step) => (
                    <li key={step.text} className={step.planned ? 'is-planned' : undefined}>
                      <span className="flow-step__text">{step.text}</span>
                      {step.note && <span className="flow-step__note">{step.note}</span>}
                      {step.planned && <span className="flow-step__badge">Planned</span>}
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </figure>
      )

    case 'table':
      return (
        <figure className="block block--table">
          <h3>{block.title}</h3>
          {block.caption && <figcaption>{block.caption}</figcaption>}
          <div className="table-wrap" tabIndex={0} role="region" aria-label={block.title}>
            <table>
              <thead>
                <tr>
                  {block.columns.map((c) => (
                    <th key={c} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row.join('|')}>
                    {row.map((cell, i) => (
                      <td key={`${block.columns[i]}-${cell}`} data-label={block.columns[i]}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.note && <p className="block__note">{block.note}</p>}
        </figure>
      )

    case 'metrics':
      return (
        <figure className="block block--metrics">
          <h3>{block.title}</h3>
          {block.caption && <figcaption>{block.caption}</figcaption>}
          <div className="metric-groups">
            {block.groups.map((group) => (
              <section key={group.label} className="metric-group">
                <h4>{group.label}</h4>
                <ul>
                  {group.bars.map((bar, i) => (
                    <li key={bar.name}>
                      <span className="metric__name">{bar.name}</span>
                      <span className="metric__track" aria-hidden="true">
                        <span
                          className={`metric__bar metric__bar--${i % 2 ? 'b' : 'a'}`}
                          style={{ width: `${Math.round((bar.value / block.max) * 100)}%` }}
                        />
                      </span>
                      <span className="metric__value">{bar.value.toFixed(4)}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          {block.note && <p className="block__note">{block.note}</p>}
        </figure>
      )

    case 'stack':
      return (
        <figure className="block block--stack">
          <h3>{block.title}</h3>
          {block.caption && <figcaption>{block.caption}</figcaption>}
          <ol className="stack-layers">
            {block.layers.map((layer) => (
              <li key={layer.label} className={layer.planned ? 'is-planned' : undefined}>
                <span className="stack-layer__label">
                  {layer.label}
                  {layer.planned && <span className="flow-step__badge">Planned, not built</span>}
                </span>
                <span className="stack-layer__items">
                  {layer.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ol>
        </figure>
      )

    case 'image':
      return (
        <figure className={`block block--image${block.wide ? ' block--wide' : ''}`}>
          <ZoomImage src={block.src} alt={block.alt} caption={block.caption} />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      )

    case 'gallery':
      return (
        <figure className="block block--gallery">
          <h3>{block.title}</h3>
          {block.caption && <figcaption>{block.caption}</figcaption>}
          <ul className="gallery">
            {block.items.map((item) => (
              <li key={item.src}>
                <ZoomImage src={item.src} alt={item.alt} caption={item.caption} />
                {item.caption && <span className="gallery__cap">{item.caption}</span>}
              </li>
            ))}
          </ul>
        </figure>
      )

    case 'stats':
      return (
        <figure className="block block--stats">
          <h3>{block.title}</h3>
          {block.caption && <figcaption>{block.caption}</figcaption>}
          <dl className="stat-grid">
            {block.items.map((item) => (
              <div key={item.label} className="stat">
                <dd>{item.value}</dd>
                <dt>{item.label}</dt>
              </div>
            ))}
          </dl>
          {block.note && <p className="block__note">{block.note}</p>}
        </figure>
      )
  }
}
