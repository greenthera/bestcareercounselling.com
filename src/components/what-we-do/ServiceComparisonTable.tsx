import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { services } from '@/data/services'

export function ServiceComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-[1.6rem] border border-neutral-border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Who It's For</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Assessment</TableHead>
            <TableHead>Admission Support</TableHead>
            <TableHead>Best Time to Start</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell className="font-medium text-ink">{service.title}</TableCell>
              <TableCell>{service.comparison.whoItsFor}</TableCell>
              <TableCell>{service.comparison.duration}</TableCell>
              <TableCell>{service.comparison.assessment}</TableCell>
              <TableCell>{service.comparison.admissionSupport}</TableCell>
              <TableCell>{service.comparison.bestTimeToStart}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
