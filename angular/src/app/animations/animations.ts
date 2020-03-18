import {
  trigger,
  transition,
  query,
  stagger,
  animate,
  style,
  keyframes,
  state,
  animateChild
} from "@angular/animations";

export let songCardTrigger = trigger('songCardTrigger', [
  transition('* => *',[
    query(".song-card", [
      animate("1s ease-in-out", keyframes([
        style({opacity: 0, transform: "translateX(-100px)"}),
        style({opacity: 1, transform: "translateX(50px)"}),
        style({opacity: 1, transform: "translateX(0px)"}),
      ])),
    ])
  ])
]);
export let songSearchCardTrigger = trigger('songSearchCardTrigger', [
  transition('* => *',[
      animate("1s ease-in-out", keyframes([
        style({opacity: 0, transform: "translateX(-100px)"}),
        style({opacity: 1, transform: "translateX(50px)"}),
        style({opacity: 1, transform: "translateX(0px)"}),
      ])),
  ])
]);
// export let songCardTrigger = trigger("songCardTrigger", [
//   transition("* => *", [
//     query(".song-card", style({opacity: 0}), {optional: true}),
//     query(".song-card", stagger(200, [
//         animate("1s ease-in-out",keyframes([
//           style({opacity: 0, transform: "translateX(-100px)"}),
//           style({opacity: 1, transform: "translateX(50px)"}),
//           style({opacity: 1, transform: "translateX(0px)"}),
//         ]))
//       ]),
//       { optional: true }
//     )
//   ])
// ]);

export let fadeTrigger = trigger("fadeTrigger", [
  transition(":enter", [
    style({ opacity: 0 }),
    animate("1s ease-in", style({ opacity: 1 }))
  ])
]);
