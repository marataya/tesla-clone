chart = {
    const context = DOM.context2d(width, height);
    const path = d3.geoPath(projection, context);

    function render(land) {
    context.clearRect(0, 0, width, height);
    context.beginPath(), path(sphere), context.fillStyle = "#fff", context.fill();
    context.beginPath(), path(land), context.fillStyle = "#000", context.fill();
    context.beginPath(), path(sphere), context.stroke();
}

return d3.select(context.canvas)
    .call(drag(projection)
        .on("drag.render", () => render(land110))
        .on("end.render", () => render(land50)))
    .call(() => render(land50))
    .node();
  }

drag = ƒ(projection)

function drag(projection) {
    let v0, q0, r0, a0, l;

    function pointer(event, that) {
        const t = d3.pointers(event, that);

        if (t.length !== l) {
            l = t.length;
            if (l > 1) a0 = Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0]);
            dragstarted.apply(that, [event, that]);
        }

        // For multitouch, average positions and compute rotation.
        if (l > 1) {
            const x = d3.mean(t, p => p[0]);
            const y = d3.mean(t, p => p[1]);
            const a = Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0]);
            return [x, y, a];
        }

        return t[0];
    }

    function dragstarted(event) {
        v0 = versor.cartesian(projection.invert(pointer(event, this)));
        q0 = versor(r0 = projection.rotate());
    }

    function dragged(event) {
        const p = pointer(event, this);
        const v1 = versor.cartesian(projection.rotate(r0).invert(p));
        const delta = versor.delta(v0, v1);
        let q1 = versor.multiply(q0, delta);

        // For multitouch, compose with a rotation around the axis.
        if (p[2]) {
            const d = (p[2] - a0) / 2;
            const s = -Math.sin(d);
            const c = Math.sign(Math.cos(d));
            q1 = versor.multiply([Math.sqrt(1 - s * s), 0, 0, c * s], q1);
        }

        projection.rotate(versor.rotation(q1));

        // In vicinity of the antipode (unstable) of q0, restart.
        if (delta[0] < 0.7) dragstarted.apply(this, [event, this]);
    }

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged);
}