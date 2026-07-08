export type Icon3DKind = 'cube' | 'stack' | 'coin' | 'gyro';

/**
 * A small animated CSS-3D solid used as a per-service card icon. Pure
 * transforms (no WebGL) so it's cheap to run four at once; color follows
 * --accent and it spins faster when its `.service-card` parent is hovered.
 */
export default function ServiceIcon({ kind }: { kind: Icon3DKind }) {
  switch (kind) {
    case 'cube':
      return (
        <div className="i3d" aria-hidden>
          <div className="i3d__cube">
            <span className="f f1" />
            <span className="f f2" />
            <span className="f f3" />
            <span className="f f4" />
            <span className="f f5" />
            <span className="f f6" />
          </div>
        </div>
      );
    case 'stack':
      return (
        <div className="i3d" aria-hidden>
          <div className="i3d__stack">
            <span className="p p1" />
            <span className="p p2" />
            <span className="p p3" />
          </div>
        </div>
      );
    case 'coin':
      return (
        <div className="i3d" aria-hidden>
          <div className="i3d__coin">
            <span className="ring ring-o" />
            <span className="ring ring-i" />
          </div>
        </div>
      );
    case 'gyro':
      return (
        <div className="i3d" aria-hidden>
          <div className="i3d__gyro">
            <span className="r r1" />
            <span className="r r2" />
            <span className="r r3" />
            <span className="core" />
          </div>
        </div>
      );
  }
}
