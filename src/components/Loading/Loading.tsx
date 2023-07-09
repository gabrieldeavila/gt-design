/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import clsx from "clsx";
import Matter from "matter-js";
import React, { useEffect, useRef, useState } from "react";
import { Loader } from "react-feather";
import { useTriggerState } from "react-trigger-state";
import useGTTranslate from "../../gt/Global/translate";
import Space from "../Space/Space";
import Text from "../Text";
import "./style.css";

const Loading = ({
  avoidClose,
  show,
}: {
  avoidClose?: boolean;
  show: boolean;
}) => {
  const canvasRef = useRef(null);
  const [colors] = useTriggerState({ name: "gt_theme_colors" });
  const [theme] = useTriggerState({ name: "curr_theme" });
  const alreadyLoaded = useRef(false);

  useEffect(() => {
    if (theme == null || canvasRef.current == null || colors == null) {
      return;
    }

    alreadyLoaded.current = true;

    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Runner = Matter.Runner;
    const Body = Matter.Body;
    const MouseConstraint = Matter.MouseConstraint;
    const Mouse = Matter.Mouse;
    const Composite = Matter.Composite;
    const Constraint = Matter.Constraint;
    const Bodies = Matter.Bodies;

    // create engine
    const engine = Engine.create();
    const world = engine.world;

    // create renderer
    const render = Render.create({
      element: canvasRef.current,
      engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        showVelocity: false,
        wireframes: false,
        showBounds: false,
      },
    });

    Render.run(render);

    // create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // see newtonsCradle function defined later in this file
    const createNewtonsCradle = (
      xx: number,
      yy: number,
      number: number,
      size: number,
      length: number
    ) => {
      const newtonsCradle = Composite.create({ label: "Newtons Cradle" });
      // const colors = globalState.get("gt_theme_colors");

      for (let i = 0; i < number; i++) {
        const separation = 1.9;
        const circle = Bodies.circle(
          xx + i * (size * separation),
          yy + length,
          size,
          {
            inertia: Infinity,
            restitution: 1,
            friction: 0,
            frictionAir: 0,
            slop: size * 0.02,
            render: {
              fillStyle: colors?.contrast,
              strokeStyle: colors?.contrast,
            },
          }
        );
        const constraint = Constraint.create({
          pointA: { x: xx + i * (size * separation), y: yy },
          bodyB: circle,
          render: {
            strokeStyle: colors?.contrast,
          },
        });

        // @ts-expect-error matter-js types are not up to date
        Composite.addBody(newtonsCradle, circle);
        // @ts-expect-error matter-js types are not up to date
        Composite.addConstraint(newtonsCradle, constraint);
      }

      return newtonsCradle;
    };

    const xx2 = 280;
    const yy2 = window.innerHeight / 3 - 100;
    const number2 = 7;
    const size2 = 20;
    const length2 = 140;
    const cradle2 = createNewtonsCradle(xx2, yy2, number2, size2, length2);
    Composite.add(world, cradle2);
    // @ts-expect-error matter-js types are not up to date
    Body.translate(cradle2.bodies[0], { x: -140, y: -100 });

    // add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 50 },
      max: { x: 800, y: 600 },
    });

    // cleanup
    return () => {
      Render.stop(render);
      Runner.stop(runner);
    };
  }, [colors, theme]);

  const { translateThis } = useGTTranslate();

  const [hideAfterUnloaded, setHideAfterUnloaded] = useState(false);

  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        setHideAfterUnloaded(true);
      }, 500);
    } else {
      setHideAfterUnloaded(false);
    }
  }, [show]);

  if (hideAfterUnloaded) return null;

  return (
    <div
      className={clsx(
        "loading-content",
        !avoidClose && !show && "loading-is-done"
      )}
    >
      <Space.Modifiers
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        top="20%"
        left="0"
        right="0"
        position="fixed"
        zIndex="2"
      >
        <div className="loader-anim">
          <Loader />
        </div>
        <Text.P fontWeight="200" textAlign="center" fontSize="20px">
          {translateThis("LOADING")}
        </Text.P>
      </Space.Modifiers>
      <div ref={canvasRef}></div>
    </div>
  );
};

export default Loading;
